import { Request } from 'express';
import { TokenPayloadDto } from './token-payload.dto';

export interface RequestDto extends Request {
    user: {
      id: number;
      role: string;
    };
    body: {
      code: string;
    }
  }