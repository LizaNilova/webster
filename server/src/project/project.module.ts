import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './project.model';
import { ProjectController } from './project.controller';
import { User } from '../users/models/users.model';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Project]),
    AuthModule,
    FilesModule
  ],
  providers: [ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule { }
