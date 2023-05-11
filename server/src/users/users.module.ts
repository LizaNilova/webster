import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { UserBanned } from './models/user-banned.model';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/posts.model';
import { Comment } from 'src/comments/comments.model';
import { CommentsModule } from 'src/comments/comments.module';
import { Like } from 'src/likes/likes.model';
import { LikesModule } from 'src/likes/likes.module';
import { UserEvents } from './models/user-event.model';
import { Subscriptions } from 'src/subscriptions/subscriptions.model';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, UserBanned, Post, Comment, Like, UserEvents, Subscriptions]),
    RolesModule,
    AuthModule,
    PostsModule, 
    CommentsModule,
    LikesModule, 
    SubscriptionsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
