import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  readonly value: string;
  readonly userId: number;
}
