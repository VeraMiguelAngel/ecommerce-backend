import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PickType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPasswordDecorator } from 'src/decorators/machPassword.decorator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Test User01',
    description: 'Nombre entre 3 y 80 caracteres',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: 'Testuser01@mail.com', description: 'Email válido' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Test01@#',
    description:
      'Password entre 8 y 15 caracteres, con minúscula, mayúscula, número y símbolo',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    example: 'Test01@#',
    description: 'Debe coincidir con el password',
  })
  @IsNotEmpty()
  @Validate(MatchPasswordDecorator, ['password'])
  confirmPassword: string;

  @ApiPropertyOptional({
    example: 'Demo Street 1234',
    description: 'Dirección opcional',
  })
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  @ApiPropertyOptional({
    example: 1234567890,
    description: 'Teléfono requerido',
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiPropertyOptional({
    example: 'Demo Country',
    description: 'País entre 5 y 20 caracteres',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @ApiPropertyOptional({
    example: 'Demo City',
    description: 'Ciudad entre 5 y 20 caracteres',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, [
    'password',
    'phone',
    'address',
    'city',
    'country',
  ] as const),
) {}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
