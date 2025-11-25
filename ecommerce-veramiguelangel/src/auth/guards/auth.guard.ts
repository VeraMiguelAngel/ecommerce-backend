import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment.dev';
import JwtUser from 'src/interfaces/Jwt.Inteface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authheader = request.headers.authorization;
    if (!authheader)
      throw new UnauthorizedException(`Se requiere un token de autorización`);

    const [type, token] = authheader.split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException(`Se requiere un token de autorización`);

    try {
      const payload = this.jwtService.verify<JwtUser>(token, {
        secret: environment.JWT_SECRET,
      });

      request.user = payload;
      return true;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token ha expirado');
      }
      throw new UnauthorizedException('Error al validar el token');
    }
  }
}
