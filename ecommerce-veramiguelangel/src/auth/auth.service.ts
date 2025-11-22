import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

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
    //
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser)
      throw new UnauthorizedException('Email y/o password incorrectos');
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new UnauthorizedException('Email y/o password incorrectos');

    const payLoad = {
      id: foundUser.id,
      email: foundUser.email,
    };
    const token = this.jwtService.sign({ payLoad });

    return { message: 'Usuario logueado (Token)', token: token };
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
