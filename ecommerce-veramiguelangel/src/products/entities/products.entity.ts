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
import { ApiProperty } from '@nestjs/swagger';

@Entity('PRODUCTS')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID único del producto',
    example: 'c1a2b3d4-e5f6-7890-abcd-1234567890ef',
  })
  id: string; // UUID único, clave primaria

  @ApiProperty({
    description: 'Nombre del producto (único, máximo 50 caracteres)',
    example: 'Laptop Gamer',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Laptop gamer con procesador Intel i7 y 16GB RAM',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    description: 'Precio unitario del producto',
    example: 1499.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en stock',
    example: 25,
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/images/laptop-gamer.png',
  })
  @Column({
    type: 'varchar',
    length: 255,
    default:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijZ66h74IWpIjzrs3-o1-2Tp_O_gRrY3B5YA0JuXKLveDUgF9P4yZWADs6-uK6EP89uafjqiEESo71PXRJDT35fFDhNgp_-j__hlBdglGQ78TGk-omhJS2YwNnMQZjdloNTEmrcSgI2X8/s400/error+-+defecto+-+fallo.png', // 👈 imagen por defecto
  })
  imgUrl: string;

  // Relación N:1 con Category
  @ApiProperty({
    description: 'Categoría a la que pertenece el producto',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;

  // Relación N:N con OrderDetails
  @ApiProperty({
    description: 'Detalles de órdenes en las que aparece este producto',
    type: () => [OrderDetail],
  })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable({
    name: 'PRODUCTS_ORDERDETAILS', // tabla intermedia
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
  })
  orderDetails: OrderDetail[];
}
