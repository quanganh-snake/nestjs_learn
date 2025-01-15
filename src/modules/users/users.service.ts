import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { hashString } from 'src/utils/hashing';
import { TQueryFindAll } from 'src/types';
import { PhonesService } from 'src/modules/phones/phones.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly phonesService: PhonesService,
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
    } = query;

    const take = _limit;
    const skip = (_page - 1) * take;
    const order = { [_sort]: _order }

    const where = [];

    if (q) {
      where.push({
        email: ILike(`%${q}%`),
      }, {
        name: ILike(`%${q}%`),
      })
    }

    return await this.usersRepository.findAndCount({
      where,
      order,
      take,
      skip,
      relations: {
        phone: true,
      },
    });
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(body: { ids: number[] }) {
    const { ids } = body;
    // Cách 1:
    // const usersToRemove = await this.usersRepository.findByIds(ids);
    // await this.usersRepository.delete(ids);

    // Cách 2:
    const dataDel = await this.usersRepository.delete(ids);

    return dataDel.affected;
  }
}
