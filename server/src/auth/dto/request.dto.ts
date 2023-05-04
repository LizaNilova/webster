import { Request } from 'express';
import { TokenPayloadDto } from './token-payload.dto';

export interface RequestDto extends Request {
    user: {
      id: number;
    };
    body: {
      code: string;
    }
  }