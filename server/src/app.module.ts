import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { User } from './users/models/users.model';
import { UserBanned } from './users/models/user-banned.model';

import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';

import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';

import { CategoriesModule } from './categories/categories.module';
import { PostCategory } from './categories/post-category.model';
import {Category} from './categories/categories.model'

import { AuthModule } from './auth/auth.module';

import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comments.model';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/likes.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailModule } from './mail/mail.module';
import * as path from 'path';
import { UserEvents } from './users/models/user-event.model';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { Subscriptions } from './subscriptions/subscriptions.model';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, UserBanned, Post, PostCategory, Category, Comment, Like, UserEvents, Subscriptions],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    FilesModule,
    PostCategory,
    CommentsModule,
    LikesModule,
    MailModule,
    SubscriptionsModule
  ],
})
export class AppModule {}
