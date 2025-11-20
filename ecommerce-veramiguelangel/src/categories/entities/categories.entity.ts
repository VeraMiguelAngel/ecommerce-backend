import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/products.entity';

@Entity('CATEGORY')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID único, clave primaria

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  // Relación 1:N con Products (una categoría tiene muchos productos)
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
