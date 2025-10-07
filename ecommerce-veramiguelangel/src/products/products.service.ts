import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProducts(): string {
    return 'Todos los Productos';
  }
}
