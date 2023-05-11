import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';

export interface RequestDto extends Request {
  user: {
    id: number;
    login: string;
    email: string;
    role: string;
  };
  cookies: {
    accessToken: string;
    refreshToken: string;
  };
  body: {
    code: string;
  };
}