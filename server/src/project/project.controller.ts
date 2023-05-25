import { BadRequestException, Body, Controller, Delete, ForbiddenException, NotFoundException, Param, ParseFilePipe, Patch, Post, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { RequestDto } from '../auth/dto/request.dto';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ChangeProjectDto } from './dto/change-project.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('project')
@Controller('/api/project')
export class ProjectController {
  constructor(private projectService: ProjectService) { }
  @ApiOperation({ summary: 'Create project' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        message: 'Create project'
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
    return {
      massage: await this.projectService.create({ ...dto, userId: req.user.id, image }),
    }
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

  @Delete('/:id')
  async delete() {

  }
}
