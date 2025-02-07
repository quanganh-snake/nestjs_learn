import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { hashString } from 'src/utils/hashing';
import { TQueryFindAll } from 'src/types';
import { PhonesService } from 'src/modules/phones/phones.service';
import { PostsService } from 'src/modules/posts/posts.service';

@Injectable()
export class UsersService {

  private filters = {
    posts: ['title'],
    phone: ['phone']
  }

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly phonesService: PhonesService,
    private readonly postService: PostsService,
  ) { }

  async create(createUserDto: Partial<CreateUserDto & { phone: string }>) {
    const { phone, ...user } = createUserDto;

    const userNew = this.usersRepository.create(user);
    userNew.password = await hashString(userNew.password)


    const uesr = await this.usersRepository.save(userNew);
    const data = await this.phonesService.create({ phone }, uesr);
    console.log("🚀 ~ UsersService ~ create ~ data:", data)
  }

  async findAll(query: TQueryFindAll) {
    const {
      q = '',
      _sort,
      _order,
      _page = 1,
      _limit = 10,
      _includes,
    } = query;

    const take = _limit;
    const skip = (_page - 1) * take;
    const order = { [_sort]: _order }

    const where = [];

    if (q) {
      where.push({
        email: Like(`%${q}%`),
      }, {
        name: Like(`%${q}%`),
      })
    }

    const relations = _includes ? _includes.split(',') : [];

    return await this.usersRepository.findAndCount({
      where,
      order,
      take,
      skip,
      relations
    });
  }


  findOne(id: number, query: { includes: string, [key: string]: string }) {

    const { includes, ...rest } = query;

    const relations = includes ? includes.split(',') : [];

    const filterRelations = {}
    Object.keys(rest).forEach(key => {
      const relationName = key.replace('_query', '')
      filterRelations[relationName] = this.filters[relationName].map(field => ({
        [field]: Like(`%${rest[key]}%`)
      }))

    })
    const findUser = this.usersRepository.findOneOrFail({
      where: {
        id,
        ...filterRelations
      },
      relations
    });

    return findUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async deleteOne(id: number) {
    const user = await this.usersRepository.findOneBy({
      id
    });

    // 1. Xóa phone trước
    await this.phonesService.deleteByUser(user.id);

    // 2. Xóa posts
    await this.postService.deleteByUser(id);

    await this.usersRepository.delete({
      id
    });
    return user;
  }

  async deleteMany(body: { ids: number[] }) {
    const { ids } = body;
    // Cách 1:
    // const usersToRemove = await this.usersRepository.findByIds(ids);
    // await this.usersRepository.delete(ids);

    // Cách 2:
    const dataDel = await this.usersRepository.delete(ids);

    return dataDel.affected;
  }
}
