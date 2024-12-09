import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {}
  insert(name: string) {
    const response = this.CategoryRepository.findOneBy({});
  }
}
