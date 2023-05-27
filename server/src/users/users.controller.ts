import {
  BadRequestException, Body, Query, Controller, ForbiddenException,
  Get, NotFoundException, Param, Post, Req, UnauthorizedException,
  UseGuards, UsePipes,  Delete,  Patch, UseInterceptors, UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UsersService } from './users.service';
import { IsOptional } from 'class-validator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RequestDto } from '../auth/dto/request.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Create users (only ADMIN)' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        "user": {
          "id": 1,
          "login": "user",
          "email": "user@gmail.com",
          "password": "$2a$05$tEn9cPZRb5SkTtRy7FJNa.9w2Dq8rrGqO3Sapcxrv7o1lrWCvtkGK",
          "avatar":"0cae4e09-eb11-450a-a3b5-0b52b7fb7d8c.jpg",
          "is_active": true,
          "updatedAt": new Date(),
          "createdAt": new Date()
        },
        "message": "Create user"
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
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return {
      user: await this.usersService.createUser({ ...userDto, is_active: true }),
      message: 'Create user'
    };
  }


  @ApiOperation({ summary: 'Get all date users (only ADMIN)' })
  @ApiOkResponse({
    description: 'Response users', schema: {
      example: {
        "users": [
          {
            "id": 2,
            "login": "admin",
            "email": "admin@gmail.com",
            "password": "$2a$05$.Fte7gIFzKuJ7mHzTvoRveC66aYemevATJoyOnC9tys.CFuGhKTym",
            "is_active": true,
            "createdAt": "2023-05-04T15:13:14.940Z",
            "updatedAt": "2023-05-04T15:13:14.940Z",
            "roles": [
              {
                "id": 2,
                "value": "ADMIN",
                "description": "admin odmen",
                "createdAt": "2023-05-04T14:12:00.370Z",
                "updatedAt": "2023-05-04T14:12:00.370Z",
                "UserRoles": {
                  "roleId": 2,
                  "userId": 3
                }
              }
            ],
            "posts": [],
            "comments": [],
            "likes": [],
            "ban": null,
            "subscriptions": [],
            "events": []
          },
          {
            "id": 1,
            "login": "user",
            "email": "user@gmail.com",
            "password": "$2a$05$pntQPqZDN1nJei.EU/7KDeVJFnT848GK2YVY4KS9PKdphd.B4UDnu",
            "is_active": true,
            "createdAt": "2023-05-04T15:24:20.845Z",
            "updatedAt": "2023-05-04T15:24:40.264Z",
            "roles": [
              {
                "id": 1,
                "value": "USER",
                "description": "user luzer",
                "createdAt": "2023-05-04T14:11:38.371Z",
                "updatedAt": "2023-05-04T14:11:38.371Z",
                "UserRoles": {
                  "roleId": 1,
                  "userId": 6
                }
              }
            ],
            "posts": [
              {
                "id": 2,
                "title": "Govna webster1",
                "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
                "image": "75293e0c-d171-4651-a4bd-f7c998da6936.jpg",
                "userId": 6,
                "createdAt": "2023-05-06T14:14:26.757Z",
                "updatedAt": "2023-05-06T14:14:26.757Z"
              }
            ],
            "comments": [],
            "likes": [
              {
                "id": 1,
                "postId": 1,
                "userId": 6
              },
              {
                "id": 2,
                "postId": 2,
                "userId": 6
              }
            ],
            "ban": null,
            "subscriptions": [],
            "events": []
          }
        ],
        "message": "Success"
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @UseGuards(JwtAuthGuard)
  // get all users and their rating
  @Get()
  async getAll(@Query('search') search: string) {
    return {
      users: await this.usersService.getAllUsers(search),
      message: 'Success'
    }
  }

  @ApiOperation({ summary: 'Set user role (only admin)' })
  @ApiCreatedResponse({
    description: 'Changed user role', schema: {
      example: {
        "user": {
          "userId": 1,
          "value": "USER"
        },
        "message": "Set user role - USER"
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    schema: {
      example: {
        "value": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        },
        "userId": {
          "value": "undefined",
          "constraints": [
            "Should be a number"
          ]
        }
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('Undefined role or user')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/role')
  async addRole(@Body() dto: AddRoleDto) {
    return {
      user: await this.usersService.addRole(dto),
      message: `Set user role - ${dto.value}`
    }
  }

  @ApiOperation({ summary: 'Benned user (only admin)' })
  @ApiCreatedResponse({
    description: 'Changed user role', schema: {
      example: {
        "user": {
          "userId": 1,
          "value": "USER"
        },
        "message": "Set user role - USER"
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    schema: {
      example: {
        "userId": {
          "value": "undefined",
          "constraints": [
            "Should be a number"
          ]
        },
        "banReason": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        }
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('User undefined')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/ban')
  async ban(@Body() dto: BanUserDto, @Req() request: RequestDto) {
    return {
      user: await this.usersService.ban({ ...dto, adminId: request.user.id }),
      message: 'User banned'
    };
  }

  @ApiOperation({ summary: 'User profile (Bearer token)' })
  @ApiOkResponse({
    description: 'Response user profile info', schema: {
      example: {
        "user": {
          "id": 3,
          "login": "admin",
          "email": "admin@gmail.com",
          "role": "ADMIN",
          "posts": [
            {
              "id": 1,
              "title": "Govna webster2",
              "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
              "image": "af3d5f35-453f-44b1-a788-24a048f96404.jpg",
              "userId": 3,
              "createdAt": "2023-05-06T11:37:59.708Z",
              "updatedAt": "2023-05-06T11:37:59.708Z"
            }
          ],
          "ban": null,
          "subscriptions": []
        },
        "message": "Success"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    schema: {
      example: {
        "userId": {
          "value": "undefined",
          "constraints": [
            "Should be a number"
          ]
        },
        "banReason": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  // get me, my rating and my posts
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() request: RequestDto) {
    return {
      user: await this.usersService.getUserById(request.user.id),
      message: 'Success'
    }
  }

  // edit my profile
  @Patch('/edit')
  @ApiCreatedResponse({
    description: 'The record has been successfully edited.', schema: {
      example: {
        "user": {
          "id": 1,
          "login": "user",
          "email": "user@gmail.com",
          "password": "$2a$05$tEn9cPZRb5SkTtRy7FJNa.9w2Dq8rrGqO3Sapcxrv7o1lrWCvtkGK",
          "avatar":"0cae4e09-eb11-450a-a3b5-0b52b7fb7d8c.jpg",
          "is_active": true,
          "updatedAt": new Date(),
          "createdAt": new Date()
        },
        "message": "Changes are saved. If you have changed your email, check the it"
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async edit_profile(@Req() request: RequestDto, @Body() userDto: EditUserDto, 
    @UploadedFile() avatar?: Express.Multer.File) {
      return {
      user: await this.usersService.edit_profile(request.user.id, userDto, avatar),
      message: 'Changes are saved. If you have changed your email, check the it'
    }
  }

  // get me and my posts
  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  async delete_profile(@Req() request: RequestDto) {
    return {
      user: await this.usersService.delete_profile(request.user.id),
      message: 'Success'
    }
  }

  @ApiOperation({ summary: 'User profile by id' })
  @ApiOkResponse({
    description: 'Response user profile info', schema: {
      example: {
        "user": {
          "id": 6,
          "login": "user",
          "email": "user@gmail.com",
          "role": "USER",
          "posts": [
            {
              "id": 2,
              "title": "Govna webster1",
              "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
              "image": "75293e0c-d171-4651-a4bd-f7c998da6936.jpg",
              "userId": 6,
              "createdAt": "2023-05-06T14:14:26.757Z",
              "updatedAt": "2023-05-06T14:14:26.757Z"
            }
          ],
          "ban": null,
          "subscriptions": []
        },
        "message": "Success"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('User undefined')
    }
  })
  // get another user by id, his rating and his posts
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return {
      user: await this.usersService.getUserById(id),
      message: 'Success'
    };
  }

}