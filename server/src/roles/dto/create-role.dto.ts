import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'MODERATOR', description: 'Title role' })
  @IsString({ message: 'Should be a string' })
  readonly value: string;

  @ApiProperty({ example: 'support admin', description: 'Description role' })
  @IsString({ message: 'Should be a string' })
  readonly description: string;
}
