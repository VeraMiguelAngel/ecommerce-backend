import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/auth/enums/roles.enum';
import JwtUser from 'src/interfaces/Jwt.Inteface';
import { environment } from 'src/config/environment.dev';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Autenticado';
  }

  async signIn(email: string, password: string) {
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser)
      throw new UnauthorizedException('Email y/o password incorrectos');

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new UnauthorizedException('Email y/o password incorrectos');

    const roles = foundUser.isAdmin ? [Role.Admin] : [Role.User];

    const payload: JwtUser = {
      sub: foundUser.id,
      id: foundUser.id,
      email: foundUser.email,
      roles,
    };

    const token = this.jwtService.sign(payload, {
      secret: environment.JWT_SECRET,
      expiresIn: '1h',
    });

    return { message: 'Usuario logueado (Token)', token };
  }

  async singUp(user: Partial<Users>) {
    const { email, password } = user;
    if (!email || !password)
      throw new BadRequestException(`El email y password son requeridos`);
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException(`El email ya está registrado`);

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersRepository.addUser({
      ...user,
      password: hashedPassword,
    });
  }
}
