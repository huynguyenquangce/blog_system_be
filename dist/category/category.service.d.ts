import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
export declare class CategoryService {
    private readonly CategoryRepository;
    constructor(CategoryRepository: Repository<CategoryEntity>);
    insert(name: string): void;
}
