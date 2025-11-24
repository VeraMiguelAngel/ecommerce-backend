import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums/roles.enum';
import JwtUser from 'src/interfaces/Jwt.Inteface';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as JwtUser;

    const hasRole = () =>
      requireRoles.some((role) => user?.roles?.includes(role));

    const valid = user && hasRole();
    if (!valid)
      throw new UnauthorizedException('Acceso negado, solo para Admin');
    return true;
  }
}
