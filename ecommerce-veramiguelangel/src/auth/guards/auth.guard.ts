import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validate(request: Request) {
  const authHeaders = request.headers['authorization'];

  if (!authHeaders) return false;

  const auth = authHeaders.split(' ')[1];

  const [email, password] = auth.split(':');
  if (!email || !password) return false;

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return validate(request);
  }
}
