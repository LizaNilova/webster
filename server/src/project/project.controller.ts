import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, ParseFilePipe, Patch, Post, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { RequestDto } from '../auth/dto/request.dto';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ChangeProjectDto } from './dto/change-project.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { retry } from 'rxjs';

@ApiTags('project')
@Controller('/api/project')
export class ProjectController {
  constructor(private projectService: ProjectService) { }


  @ApiOperation({ summary: 'Get projects' })
  @ApiOkResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        message: 'Create project'
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('User undefined')
    }
  })
  @Roles('USER')
  @UseGuards(RolesAuthGuard)
  @Get()
  @UseGuards(JwtAuthGuard)
  async getProjects(@Request() req: RequestDto) {
    return await this.projectService.getAll(req.user.id);
  }

  @ApiOperation({ summary: 'Get project by id' })
  @ApiOkResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        message: 'Create project'
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('User undefined')
    }
  })
  @Roles('USER')
  @UseGuards(RolesAuthGuard)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getProjectById(@Param('id') id: number, @Request() req: RequestDto) {
    return await this.projectService.getById(id, req.user.id);
  }

  @ApiOperation({ summary: 'Create project' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        "massage": {
            "project": {
                "id": 5,
                "name": "Project1",
                "setting": "{\"x\":5,\"y\":6}",
                "userId": 1,
                "image": "f4546a71-0a09-478e-a2c3-def50d2645df.jpg",
                "updatedAt": "2023-05-26T12:05:44.215Z",
                "createdAt": "2023-05-26T12:05:44.215Z"
            },
            "message": "Create project"
        }
    }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: new BadRequestException({
        massage: {
          "name": {
            "value": "undefined",
            "constraints": [
              "is should be string",
              "Is requary"
            ]
          },
          "setting": {
            "value": "undefined",
            "constraints": [
              "is should be string",
              "Is requary"
            ]
          }
        }
      })
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @Roles('USER')
  @UseGuards(RolesAuthGuard)
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body(ValidationPipe) dto: CreateProjectDto,
    @Request() req: RequestDto,
    @UploadedFile(new ParseFilePipe()) image: Express.Multer.File) {
    return await this.projectService.create({ ...dto, userId: req.user.id, image })
    
  }

  @ApiOperation({ summary: 'Update project by id' })
  @ApiCreatedResponse({
    description: 'Update project', schema: {
      example: {
        message: 'Update project'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: new BadRequestException({
        massage: {
          "setting": {
            "value": "undefined",
            "constraints": [
              "is should be string",
              "Is requary"
            ]
          }
        }
      })
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('User undefined')
    }
  })
  @Roles('USER')
  @UseGuards(RolesAuthGuard)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async save(@Param('id') id: number, @Body(ValidationPipe) dto: ChangeProjectDto,
    @Request() req: RequestDto,
    @UploadedFile(new ParseFilePipe()) image: Express.Multer.File) {
    return {
      message: await this.projectService.save({ ...dto, id, image, userId: req.user.id }),
    }
  }

  @ApiOperation({ summary: 'Delete project by id' })
  @ApiOkResponse({
    description: 'delete project', schema: {
      example: {
        message: 'delete project'
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('User undefined')
    }
  })
  @Roles('USER')
  @UseGuards(RolesAuthGuard)
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Request() req: RequestDto) {
    return await this.projectService.delete(id, req.user.id);
  }
}

