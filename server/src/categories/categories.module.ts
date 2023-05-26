import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/posts.model';
import { Category } from './categories.model';
import { PostCategory } from './post-category.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Post, Category, PostCategory]),
    RolesModule,
    AuthModule,],
  exports: [CategoriesService],
})
export class CategoriesModule {}
