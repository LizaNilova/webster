import { Body, Controller, Get, Param, Post, Req, Res, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ValidationPipe } from '../pipes/validation.pipe'
import { RequestDto } from './dto/request.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Create users' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @Post('/login')
  async login(@Body() userDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(userDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken, message: 'The user is authorized' };
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return {
      eventId: await this.authService.registration(userDto),
      message: 'Send mail'
    };
  }

  @Get('/refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refresh(request.cookies['refreshToken']);
    response.clearCookie('refreshToken');
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken, message: 'Success' };
  }

  @Post('confirm/:id')
  async confirm(@Param('id') id: string, @Req() request: RequestDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.confirm(id, request.body.code);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken, message: 'User comfirm account' };
  }
}
