import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/modules/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/modules/users/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(
    // private readonly usersService: UsersService,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) { }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: {
        id
      },
      relations: {
        user: true
      }
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async findByUser(userId: number) {
    // const findUser = await this.usersService.findOne(userId);
    // if (!findUser) return false
    // return findUser.posts;
    return []
  }

  async createPostByUser(userId: number, body: Partial<Post>) {
    // const findUser = await this.usersService.findOne(userId);
    // if (!findUser) return false
    // const post = this.postRepository.create(body);
    // post.user = findUser;
    // return this.postRepository.save(post);
  }

  async deleteByUser(userId: number) {
    // const findUser = await this.usersService.findOne(userId);
    // if (!findUser) return false
    // return this.postRepository.delete({
    //   user: findUser
    // });
  }

}
