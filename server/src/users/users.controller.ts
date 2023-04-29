import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes
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
import { User } from './users.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RequestDto } from '../auth/dto/request.dto';
import { PostsService } from 'src/posts/posts.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService,
    private postService: PostsService) { }

  @ApiOperation({ summary: 'Create users' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: User })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all date users' })
  @ApiResponse({ status: 200, description: 'Return all users (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Set user role (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Benned user (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto, @Req() request: RequestDto) {
    return this.usersService.ban({ ...dto, adminId: request.user.id });
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() request: RequestDto) {
    return this.usersService.getUserById(request.user.id);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  // get user's posts (another user) +
    // http://localhost:8080/posts/:id_user
    @Get('/posts')
    getUserPosts(@Param('id') id: number) {
        return this.postService.getUserPosts(id);
    }
}
