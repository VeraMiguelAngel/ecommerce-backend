import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  addCategories() {
    return this.categoryRepository.addCategories();
  }

  getCategories() {
    return this.categoryRepository.getCategories();
  }
}
