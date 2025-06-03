import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants';

@Injectable()
export class AdminGuards implements CanActivate {
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

    if (!userRoles) {
      throw new UnauthorizedException('You need to login');
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
