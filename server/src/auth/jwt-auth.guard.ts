import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { RequestDto } from './dto/request.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<RequestDto>();
    try {
      const token = req.cookies.accessToken;
      if (!token) {
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
