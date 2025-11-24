import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { OrderDetail } from '../../OrderDetails/entities/ordersDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @ApiProperty({
    description: 'uuid v4 generada por la base de datos',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID único, clave primaria

  @ApiProperty({
    description: 'Debe ser una fecha con formato dd/mm/yyyy',
    example: '23/11/2025',
  })
  @Column()
  date: Date;

  // Relación N:1 con Users (un usuario puede tener muchos pedidos)
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  // Relación 1:1 con OrderDetails

  @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.order, {
    cascade: true,
  })
  @JoinColumn()
  orderDetail: OrderDetail;
}
