import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene información de autenticación' })
  getAuth(): string {
    return this.authService.getAuth();
  }

  @Post('signin')
  @ApiOperation({ summary: 'Inicia sesión de un usuario' })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  singUp(@Body() user: CreateUserDto) {
    return this.authService.singUp(user);
  }
}
