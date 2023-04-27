import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  readonly userId: number;
  readonly banReason: string;
}
