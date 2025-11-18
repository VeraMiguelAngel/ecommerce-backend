import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Orders } from '../Orders/orders.entity';
import { Product } from '../Products/products.entity';

@Entity('ORDERDETAILS')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID único, clave primaria

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  // Relación 1:1 con Orders
  @OneToOne(() => Orders, (order) => order.orderDetail, { nullable: false })
  order: Orders;

  // Relación N:N con Products
  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];
}
