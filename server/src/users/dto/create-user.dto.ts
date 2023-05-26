import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'user login' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly login: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'The e-mail address is invalid' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'user password' })
  @IsString({ message: 'Should be a string' })
  @Length(8, 32, { message: 'Тo more than 8 and no more than 32' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly password: string;

  @ApiProperty({ example: 'qwerty123', description: 'user comfirm password' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly passwordComfirm: string;

  readonly is_active: boolean;
}
