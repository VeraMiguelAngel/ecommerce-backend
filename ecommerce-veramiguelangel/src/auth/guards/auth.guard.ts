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
import { Role } from '../enums/roles.enum';
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
      const payLoad = this.jwtService.verify<JwtUser>(token, {
        secret: environment.JWT_SECRET,
      });

      payLoad.roles = payLoad.isAdmin ? [Role.Admin] : [Role.User];

      request.user = payLoad;
      return true;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException(`El token ha expirado`);
      throw new UnauthorizedException(`Error al validar el token`);
    }
  }
}
