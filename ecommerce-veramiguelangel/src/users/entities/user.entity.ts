import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../../orders/entities/orders.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'USERS',
})
export class Users {
  @ApiProperty({
    description: 'UUID único del usuario',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del usuario (máximo 50 caracteres)',
    example: 'Juan Pérez',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'juanperez@mail.com',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'Contraseña encriptada del usuario',
    example: '$2b$10$hashedPasswordExample',
  })
  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 1123456789,
  })
  @Column({
    type: 'int',
  })
  phone: number;

  @ApiProperty({
    description: 'País de residencia del usuario',
    example: 'Argentina',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Av. Siempre Viva 742',
  })
  @Column({
    type: 'text',
  })
  address: string;

  @ApiProperty({
    description: 'Ciudad de residencia del usuario',
    example: 'Buenos Aires',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @ApiProperty({
    description: 'Indica si el usuario tiene rol de administrador',
    example: false,
  })
  @Column({
    default: false,
  })
  isAdmin: boolean;

  //* Users 1:N Orders
  @ApiProperty({
    description: 'Lista de órdenes asociadas al usuario',
    type: () => [Orders],
  })
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
