import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'USER', description: 'name role' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly value: string;

  @ApiProperty({ example: '1', description: 'user id' })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly userId: number;
}
