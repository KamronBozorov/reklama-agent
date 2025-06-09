import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();
    const userRoles = req.user?.roles;

    console.log(req.user);

    if (!userRoles) {
      throw new ForbiddenException('Access denied');
    }

    if (userRoles.includes('superadmin')) {
      return true;
    }

    const permit = userRoles.some((role) => requiredRoles.includes(role));
    if (!permit) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
