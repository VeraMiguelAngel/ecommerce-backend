import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(userId: string, productId: string) {
    return this.ordersRepository.addOrder(userId, productId);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
