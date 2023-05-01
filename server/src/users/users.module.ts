import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { UserBanned } from './user-banned.model';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/posts.model';
import { Comment } from 'src/comments/comments.model';
import { CommentsModule } from 'src/comments/comments.module';
import { Like } from 'src/likes/likes.model';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, UserBanned, Post, Comment, Like]),
    RolesModule,
    AuthModule,
    PostsModule, 
    CommentsModule,
    LikesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
