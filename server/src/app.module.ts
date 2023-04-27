import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { UserBanned } from './users/user-banned.model';

import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';

import { PostModule } from './posts/posts.module';
import { Post } from './posts/posts.model';

import { CategoriesModule } from './categories/categories.module';
import { PostCategory } from './categories/post-category.model';
import {Category} from './categories/categories.model'

import { AuthModule } from './auth/auth.module';

import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
       host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, UserBanned, Post, PostCategory, Category],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostModule,
    CategoriesModule,
    FilesModule,
    PostCategory,
    Category
  ],
})
export class AppModule {}
