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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token)
      throw new UnauthorizedException(`Se requiere un token de autorización`);

    try {
      const secret = environment.JWT_SECRET;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payLoad = this.jwtService.verify(token, { secret });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      payLoad.exp = new Date(payLoad.exp * 1000);
      console.log('PayLoad: ', payLoad);

      // request.user = payLoad;
      // console.log(request.user);

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException(`Error al validar el token`);
    }
  }
}
