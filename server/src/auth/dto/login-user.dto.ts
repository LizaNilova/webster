import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user or user@gmail.com', description: 'user login or mail' })
  @IsString({ message: 'Should be a string' })
  readonly username: string;

  @ApiProperty({ example: 'qwerty123', description: 'user password' })
  @IsString({ message: 'Should be a string' })

  readonly password: string;
}
