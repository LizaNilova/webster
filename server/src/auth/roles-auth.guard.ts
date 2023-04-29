import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLEY_KEY } from './roles-auth.decorator';

interface reqDto {
  user: object;
  headers: {
    authorization: string;
  };
}

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req: reqDto = context.switchToHttp().getRequest();
      const requairedRole = this.reflector.getAllAndOverride<string[]>(
        ROLEY_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requairedRole) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const user = this.jwtService.verify(token);
      return requairedRole.includes(user.role);
    } catch (err) {
      throw new HttpException('User role no Admin', HttpStatus.FORBIDDEN);
    }
  }
}
