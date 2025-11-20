import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';
import { OrderDetail } from '../../OrderDetails/entities/ordersDetails.entity';

@Entity('PRODUCTS')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID único, clave primaria

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'varchar',
    length: 255,
    default:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijZ66h74IWpIjzrs3-o1-2Tp_O_gRrY3B5YA0JuXKLveDUgF9P4yZWADs6-uK6EP89uafjqiEESo71PXRJDT35fFDhNgp_-j__hlBdglGQ78TGk-omhJS2YwNnMQZjdloNTEmrcSgI2X8/s400/error+-+defecto+-+fallo.png', // 👈 imagen por defecto
  })
  imgUrl: string;

  // Relación N:1 con Category
  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;

  // Relación N:N con OrderDetails
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable({
    name: 'PRODUCTS_ORDERDETAILS', // tabla intermedia
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
  })
  orderDetails: OrderDetail[];
}
