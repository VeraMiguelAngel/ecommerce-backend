import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/entities/Products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/Orders/orders.entity';
import { OrderDetail } from 'src/entities/OrderDetails/ordersDetails.entity';
import { Users } from 'src/entities/Users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Orders, OrderDetail, Users])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
