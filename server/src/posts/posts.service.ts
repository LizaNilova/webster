import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { AddCategoryDto } from './dto/add-category.dto'
import { FilesService } from '../files/files.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postsRepository: typeof Post, private categoriesService: CategoriesService,
        private filesService: FilesService) { }

    async create(dto: CreatePostDto, image: Express.Multer.File) {
        const filename = await this.filesService.createFile(image);
        const post = await this.postsRepository.create({ ...dto, image: filename });
        return post;
    }

    async getById(id: number) {
        const post = await this.postsRepository.findByPk(id, { include: { all: true } });
        return post;
    }

    async getAll() {
        const post = await this.postsRepository.findAll({ include: { all: true } });
        return post;
    }

    async editPost(dto: CreatePostDto, userId: number, id: number, image?: any) {
        const post = await this.postsRepository.findOne({ where: { id, userId } });
        if (!post) {
            throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        let filename;
        if (image) {
            filename = await this.filesService.createFile(image);
        }

        await post.update({ ...dto, image: filename });
        return post;
    }

    async deletePost(id: number, userId: number,) {
        const post = await this.postsRepository.findOne({ where: { id, userId } });
        if (!post) {
            throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        await post.destroy();
        return "Post was deleted";
    }

    async addPostCategories(dto: AddCategoryDto, userId: number, id: number) {
        const post = await this.postsRepository.findOne({ where: { id, userId }, include: { all: true } });
        if (!post) {
            throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        const category = await this.categoriesService.getCategoryByValue(dto.value);
        if (!category) {
            throw new HttpException(`Category with value ${dto.value} not found`, HttpStatus.NOT_FOUND);
        }
        await post.$add('category', category.id);
        return post;
    }

    async getUserPosts(id: number) {
        const userPosts = await this.postsRepository.findAll({ where: { id } });
        if (!userPosts) {
            throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return userPosts;
    }

    async getMyPosts(userId: number) {
        const userPosts = await this.postsRepository.findAll({ where: { userId } });
        if (!userPosts) {
            throw new HttpException(`Post with ID ${userId} not found`, HttpStatus.NOT_FOUND);
        }
        return userPosts;
    }
}
