import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly categoryService: CategoriesService,
  ) { }

  findAll() {
    return this.postRepository.find({
      relations: ['categories'],
    });
  }

  findById(id: string) {
    return this.postRepository.findOne({
      where: { id: +id },
      relations: {
        categories: true,
      },
    });
  }

  async create(body: any) {
    const { categories, ...postFromBody } = body;
    const categoryList = await Promise.all(categories.map((id: string) => this.categoryService.findById(id)));

    // return categoryList
    //categoryList là 1 mảng chứa các promise
    const post = this.postRepository.create({
      ...postFromBody,
      categories: categoryList,
    });
    await this.postRepository.save(post);
    return post
  }

  async update(id: number, body: any) {
    const { categories, ...postFromBody } = body;
    const categoriesList = await Promise.all(
      categories.map((categoryId: number) => {
        return this.categoryService.findById(categoryId.toString());
      }),
    );
    const post = await this.postRepository.findOne({
      where: { id },
    });
    const newPost = {
      ...post,
      ...postFromBody,
    };
    newPost.categories = categoriesList;

    await this.postRepository.save(newPost);

    return post;
  }

  async remove(id: number) {
    //Xóa dữ liệu bảng trung gian
    const post = await this.postRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    post.categories = [];
    await this.postRepository.save(post);

    //Xóa post theo id
    await this.postRepository.delete(id);
    return post;
  }
}
