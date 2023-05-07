import { BadRequestException, Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private roleService: RolesService) { }

  @ApiOperation({ summary: 'Create role (only admin)' })
  @ApiCreatedResponse({
    description: 'Create role', schema: {
      example: {
        "role": {
          "id": 3,
          "value": "MODERATOR",
          "description": "hz kto eta",
          "updatedAt": "2023-05-07T14:16:26.841Z",
          "createdAt": "2023-05-07T14:16:26.841Z"
        },
        "message": "Create role"
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
        'Bad insert data': {
          "value": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          },
          "description": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          }
        },
        'Role is exists': new BadRequestException('Role is exist')
      }
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
  async create(@Body() dto: CreateRoleDto) {
    return {
      role: await this.roleService.createRole(dto),
      message: 'Create role'
    };
  }

  @ApiOperation({ summary: 'get role by value (only admin)' })
  @ApiCreatedResponse({
    description: 'Create role', schema: {
      example: {
        "role": {
          "id": 2,
          "value": "ADMIN",
          "description": "admin odmen",
          "createdAt": "2023-05-04T14:12:00.370Z",
          "updatedAt": "2023-05-04T14:12:00.370Z"
        },
        "message": "Success"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found role',
    schema: {
      example: new NotFoundException('Role undefined')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('Role unauthorized')
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return {
      role: await this.roleService.getRoleByValue(value),
      message: 'Success'
    };
  }
}
