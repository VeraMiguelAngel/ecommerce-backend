import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Orders } from '../../orders/entities/orders.entity';
import { Product } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ORDERDETAILS')
export class OrderDetail {
  @ApiProperty({
    description: 'UUID único del detalle de la orden',
    example: 'd4f1c2a3-5678-90ab-cdef-1234567890ab',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Precio del detalle de la orden',
    example: 199.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'Orden asociada a este detalle (relación 1:1)',
  })
  @OneToOne(() => Orders, (order) => order.orderDetail, { nullable: false })
  order: Orders;

  @ApiProperty({
    description: 'Lista de productos asociados a este detalle (relación N:N)',
  })
  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];
}
