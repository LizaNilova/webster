import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'User id' })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly userId: number;

  readonly adminId: number;
  
  @ApiProperty({ example: 'Popusk prosto', description: 'Reason banned user' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly banReason: string;
}
