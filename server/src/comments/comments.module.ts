import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Post } from 'src/posts/posts.model';
import { Comment } from './comments.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([User, Post, Comment]),
    AuthModule,
    RolesModule
  ],
  exports: [CommentsService]
})
export class CommentsModule {}