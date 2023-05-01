import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { User } from '../users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { Category } from 'src/categories/categories.model';
import { PostCategory } from 'src/categories/post-category.model';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post, Category, PostCategory,]),
    AuthModule,
    FilesModule,
    CategoriesModule
  ],
  exports: [PostsService]
})
export class PostsModule {}
