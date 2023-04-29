import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authervice: AuthService) { }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authervice.login(userDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken };
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authervice.registration(userDto);
  }

  @Get('/refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authervice.refresh(request.cookies['refreshToken']);
    response.clearCookie('refreshToken');
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken };
  }
}
