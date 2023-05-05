import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private roleService: RolesService) { }

  @ApiOperation({ summary: 'Create role' })
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return {
      role: await this.roleService.createRole(dto),
      message: 'Create role'
    };
  }

  @ApiOperation({ summary: 'get role by value' })
  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return {
      role: await this.roleService.getRoleByValue(value),
      message: 'Success'
    };
  }
}
