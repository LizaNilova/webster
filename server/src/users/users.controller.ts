import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes, 
  Delete, 
  Patch
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { User } from './models/users.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RequestDto } from '../auth/dto/request.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Create users' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: User })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return {
      user: await this.usersService.createUser(userDto),
      message: 'Create user'
    };
  }

  @ApiOperation({ summary: 'Get all date users' })
  @ApiResponse({ status: 200, description: 'Return all users (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get()
  async getAll() {
    return {
      users: await this.usersService.getAllUsers(),
      message: 'Success'
    }
  }

  @ApiOperation({ summary: 'Set user role (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post('/role')
  async addRole(@Body() dto: AddRoleDto) {
    return {
      user: await this.usersService.addRole(dto),
      message: `Set user role - ${dto.value}`
    }
  }

  @ApiOperation({ summary: 'Benned user (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post('/ban')
  async ban(@Body() dto: BanUserDto, @Req() request: RequestDto) {
    return {
      user: await this.usersService.ban({ ...dto, adminId: request.user.id }),
      message: 'User banned'
    };
  }

  // get me and my posts
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
  @UseGuards(JwtAuthGuard)
  async edit_profile(@Req() request: RequestDto, @Body() userDto: CreateUserDto) {
    return {
      user: await this.usersService.edit_profile(request.user.id, userDto),
      message: 'Success'
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

  // get another user by id and his posts
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return {
      user: await this.usersService.getUserById(id),
      message: 'Success'
    };
  }

}
