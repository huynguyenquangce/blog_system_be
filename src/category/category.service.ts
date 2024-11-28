import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  insert(name: string) {
    console.log(name);
    return 'ok';
  }
}
