import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  readonly userId: number;
  readonly adminId: number;
  readonly banReason: string;
}
