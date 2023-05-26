import { Module, forwardRef } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Post } from 'src/posts/posts.model';
import { Like } from './likes.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [
    SequelizeModule.forFeature([User, Post, Like]),
    AuthModule,
    RolesModule,
    forwardRef(() => PostsModule)
  ],
  exports: [LikesService]
})
export class LikesModule {}
