import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Categories/categories.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';
@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesReposotory: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoriesReposotory.find();
  }

  async addCategories() {
    await Promise.all(
      data.map((element) =>
        this.categoriesReposotory
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: element.category })
          .orIgnore()
          .execute(),
      ),
    );
    return 'Categorías agregadas';
  }
}
