import { PickType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
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

  @IsNotEmpty()
  @Validate(MatchPasswordDecorator, ['password'])
  confirmPassword: string;

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

export class updateUserDto extends PartialType(
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
]) {}
