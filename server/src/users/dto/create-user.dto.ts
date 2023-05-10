import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'user login' })
  @IsString({ message: 'Should be a string' })
  readonly login: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'The e-mail address is invalid' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'user password' })
  @IsString({ message: 'Should be a string' })
  @Length(8, 32, { message: 'Тo more than 8 and no more than 32' })
  readonly password: string;

  @ApiProperty({ example: 'qwerty123', description: 'user comfirm password' })
  @IsString({ message: 'Should be a string' })
  readonly passwordComfirm: string;

  readonly is_active: boolean;
}
