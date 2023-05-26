import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { FilesService } from '../files/files.service';
import { ChangeProjectDto } from './dto/change-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project) private projectRepository: typeof Project,
    private fileService: FilesService) { }

  async getById(id: number, userId: number) {
    const project = await this.projectRepository.findOne({ where: { userId, id } });
    if (!project) {
      throw new NotFoundException('project not found');
    }
    return {
      project,
      message: 'complete'
    }
  }

  async getAll(userId: number) {
    const projects = await this.projectRepository.findAll({ where: { userId } })
    return {
      projects,
      message: 'complete'
    }
  }

  async create(dto: CreateProjectDto): Promise<Object> {
    const filename = await this.fileService.createFile(dto.image);

    const isExists = await this.projectRepository.findOne({ where: { name: dto.name } });
    if (isExists) {
      throw new BadRequestException('Name project is exists!');
    }
    const project = await this.projectRepository.create({ ...dto, image: filename });
    return {
      project,
      message :'Create project'
    };
  }

  async save(dto: ChangeProjectDto): Promise<string> {
    const project = await this.projectRepository.findByPk(dto.id);
    if (!project) {
      throw new NotFoundException('Project not found')
    }
    const filename = await this.fileService.createFile(dto.image);
    project.setting = dto.setting;
    project.image = filename;
    project.save();
    return 'update project';
  }
  async delete(id: number, userId: number) {
    const project = await this.projectRepository.findOne({ where: { id, userId } });
    if (!project) {
      throw new NotFoundException('project not found');
    }
    project.destroy();
    return {
      message: 'Delete project',
    }
  }
}
