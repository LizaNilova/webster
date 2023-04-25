import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

interface reqDto {
  user: object;
  headers: {
    authorization: string;
  };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: reqDto = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ massage: 'User unauthorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (_err) {
      throw new UnauthorizedException({ massage: 'User unauthorized' });
    }
  }
}
