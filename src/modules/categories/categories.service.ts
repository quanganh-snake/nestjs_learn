import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) { }

  getPosts(id: string) {
    return this.categoryRepository.findOne({
      where: { id: +id },
      relations: ['posts'],
    });
  }

  findById(id: string) {
    return this.categoryRepository.findOne({
      where: { id: +id },
    });
  }

}
