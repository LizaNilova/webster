import { BadRequestException, Body, Controller, Get, HttpException, NotFoundException, Param, ParseUUIDPipe, Post, Req, Res, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCookieAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiHeader, ApiHeaders, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ValidationPipe } from '../pipes/validation.pipe'
import { RequestDto } from './dto/request.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Authorisation users' })
  @ApiOkResponse({
    description: 'The user is authorized', schema: {
      example: {
        message: "The user is authorized"
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user', schema: {
      example: new UnauthorizedException({ massage: 'Incorrect login or password' })
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: new UnauthorizedException({
        massage: {
          "username": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          },
          "password": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          }
        }
      })
    }
  })
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(@Body() userDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(userDto);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { message: 'The user is authorized' };
  }


  @ApiOperation({ summary: 'Registration user' })
  @ApiCreatedResponse({
    description: 'The user is registration', schema: {
      example: {
        eventId: '37186e38-ec56-11ed-a05b-0242ac120003',
        message: 'Send mail'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: new BadRequestException({
        massage: {
          "login": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          },
          "email": {
            "value": "undefined",
            "constraints": [
              "The e-mail address is invalid",
              "Should be a string"
            ]
          },
          "password": {
            "value": "undefined",
            "constraints": [
              "Тo more than 8 and no more than 32",
              "Should be a string"
            ]
          },
          "passwordComfirm": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          }
        }
      })
    }
  })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return {
      eventId: await this.authService.registration(userDto),
      message: 'Send mail'
    };
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiCreatedResponse({
    description: 'Token refreshed', schema: {
      example: {
        message: 'Success'
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException(),

    }
  })
  @Get('/refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refresh(request.cookies['refreshToken']);
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { accessToken: tokens.accessToken, message: 'Success' };
  }

  @ApiOperation({ summary: 'Corfirm user account' })
  @ApiCreatedResponse({
    description: 'Confirm', schema: {
      example: {
        message: 'User comfirm account'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: new BadRequestException({
        massage: 'Validation failed (uuid is expected)'
      })
    }
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
    schema: {
      example: new NotFoundException('Session not found')
    }
  })
  @Post('/confirm/:id')
  async confirm(@Param('id', new ParseUUIDPipe()) id: string, @Req() request: RequestDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.confirm(id, request.body.code);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return { message: 'User comfirm account' };
  }

  @ApiOperation({ summary: 'Logout token' })
  @ApiCreatedResponse({
    description: 'Token refreshed', schema: {
      example: {
        message: 'User logout'
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException(),

    }
  })
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Res() response: Response) {
    response.clearCookie('refreshToken');
    response.clearCookie('accessToken');
    response.status(200).json({
      message: 'User logout'
    })
  }
}
