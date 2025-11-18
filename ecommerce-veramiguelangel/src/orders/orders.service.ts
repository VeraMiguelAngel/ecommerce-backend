import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/entities/Products/products.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(userId: string, products: Product[]) {
    return this.ordersRepository.addOrder(userId, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
