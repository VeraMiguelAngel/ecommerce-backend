import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth(): string {
    return 'Autenticado';
  }

  signIn(email: string, password: string) {
    if (!email || !password) {
      return 'Email y password requeridos';
    }

    const user = this.usersRepository.getUserByEmail(email);
    if (!user || user.password !== password) {
      return 'Eamil o password incorrectos';
    }
    return 'Usuario logueado (Token)';
  }
}
