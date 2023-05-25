import { Body, Controller, Delete, Param, ParseFilePipe, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { RequestDto } from '../auth/dto/request.dto';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ChangeProjectDto } from './dto/change-project.dto';

@Controller('/api/project')
export class ProjectController {
    constructor(private projectService: ProjectService) { }

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
