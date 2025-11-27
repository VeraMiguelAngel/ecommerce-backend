import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID del usuario que realiza la orden',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'UUID del producto a comprar',
    example: 'c1a2b3d4-e5f6-7890-abcd-1234567890ef',
  })
  @IsUUID()
  productId: string;
}
