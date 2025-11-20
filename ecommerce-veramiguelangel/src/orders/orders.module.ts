import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/products/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entities/orders.entity';
import { OrderDetail } from 'src/OrderDetails/entities/ordersDetails.entity';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Orders, OrderDetail, Users])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
