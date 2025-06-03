import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const tokenValue = token.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(tokenValue, {
        secret: process.env.SECRET,
      });
      console.log(decoded);

      request.user = decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
