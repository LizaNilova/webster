import { Body, Controller, Get, HttpCode, Param, Post, Req, Res, UsePipes } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ValidationPipe } from '../pipes/validation.pipe'
import { MailService } from '../mail/mail.service';
import { RequestDto } from './dto/request.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(userDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken };
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return await this.authService.registration(userDto);
  }

  @Get('/refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refresh(request.cookies['refreshToken']);
    response.clearCookie('refreshToken');
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken };
  }
}
