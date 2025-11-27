import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/products/entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  addProduct() {
    return this.productsRepository.addProduct();
  }

  createProduct(product: Omit<Product, 'íd'>) {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: string, product: Product) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
