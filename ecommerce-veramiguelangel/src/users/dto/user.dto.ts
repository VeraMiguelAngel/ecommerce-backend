import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Orders } from 'src/orders/entities/orders.entity';

export class CreateUserDto {
  id: string;
  orders: Orders[];

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'El password es requerido' })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  password: string;

  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsNumber()
  phone: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class updateUserDto {
  id: string;
  orders: Orders[];

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  password: string;

  @MinLength(3)
  @IsOptional()
  @MaxLength(80)
  address: string;

  @IsNumber()
  @IsOptional()
  phone: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
