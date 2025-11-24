import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID del usuario que realiza la orden',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos incluidos en la orden (mínimo 1)',
    type: () => [Product], // Swagger entiende que es un array de Product
    example: [
      {
        id: 'c1a2b3d4-e5f6-7890-abcd-1234567890ef',
        name: 'Producto Demo',
        price: 99.99,
        quantity: 2,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Product[];
}
