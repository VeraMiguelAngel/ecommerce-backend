import { Injectable, Query } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 10;
    return this.productsRepository.getProducts(pageNumber, limitNumber);
  }

  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  addProduct(product: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.productsRepository.addProduct(product);
  }

  updateProduct(id: string, productNewData: any) {
    return this.productsRepository.updateProduct(id, productNewData);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
