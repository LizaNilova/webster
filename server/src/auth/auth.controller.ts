import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authervice: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authervice.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authervice.registration(userDto);
  }
}
