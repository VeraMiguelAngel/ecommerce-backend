import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('CATEGORY')
export class Category {
  @ApiProperty({
    description: 'UUID único de la categoría',
    example: 'a3f1c2d4-5678-90ab-cdef-1234567890ab',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Electrónica',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({
    description: 'Lista de productos asociados a esta categoría',
  })
  @OneToMany(() => Product, (product) => product.category, {
    cascade: ['remove'],
  })
  products: Product[];
}
