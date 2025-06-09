import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requestedUserId = request.params.id;

    if (user.roles?.includes('superadmin')) {
      return true;
    }

    if (user.sub === +requestedUserId) {
      return true;
    }

    throw new ForbiddenException('You can only access your own resources');
  }
}
