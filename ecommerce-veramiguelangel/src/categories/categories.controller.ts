import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  @ApiOperation({ summary: 'Cargar categorías existentes a la base de datos' })
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  @ApiOperation({ summary: 'Mostrar todas las categorias' })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
