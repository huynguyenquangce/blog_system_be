import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('insert')
  insert(@Body() name: string) {
    return this.categoryService.insert(name);
  }
}
