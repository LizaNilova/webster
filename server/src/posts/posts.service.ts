import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { Category } from 'src/categories/categories.model';
import { CreatePostDto } from './dto/create-post.dto';
import { AddCategoryDto } from './dto/add-category.dto'
import { FilesService } from '../files/files.service';
import { CategoriesService } from '../categories/categories.service';
import { Op } from 'sequelize';

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

    async getAll(sort, filter, search) {
        let post = [];
        filter = filter ? JSON.parse(filter) : [];

        if (sort === 'byCategories'){
             post = (filter.length > 0 && search) ? await this.postsRepository.findAll({
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            include: [{
                model: Category,
                where: { value: { [Op.in]: filter } }
            }, { all: true }],
            order: [
                [{ model: Category, as: 'categories' }, 'value', 'ASC'] // сортировка по value категорий в возрастающем порядке
            ]
            }) : (filter.length > 0) ? await this.postsRepository.findAll({
            include: [{
                model: Category,
                where: { value: { [Op.in]: filter } },
            }],
            order: [
               [{ model: Category, as: 'categories' }, 'value', 'ASC'] // сортировка по value категорий в возрастающем порядке
            ]
            }) : (search) ? await this.postsRepository.findAll({
            include: [{ model: Category}, {all: true} ],
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            order: [
                [{ model: Category, as: 'categories' }, 'value', 'ASC'] // сортировка по value категорий в возрастающем порядке
            ]
            }) : await this.postsRepository.findAll({
                 include: [{ model: Category }, { all: true }],
                order: [
                    [{ model: Category, as: 'categories' }, 'value', 'ASC'] // сортировка по value категорий в возрастающем порядке
                ]
            });
        } else {
            post = (filter.length > 0 && search) ? await this.postsRepository.findAll({
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            include: [{
                model: Category,
                where: { value: { [Op.in]: filter } }
            }, { all: true }],
            order: [['createdAt', 'DESC']]
            }) : (filter.length > 0) ? await this.postsRepository.findAll({
            include: [{
                model: Category,
                where: { value: { [Op.in]: filter } }
            }, { all: true }],
            order: [['createdAt', 'DESC']]
            }) : (search) ? await this.postsRepository.findAll({
            include: { all: true },
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            order: [['createdAt', 'DESC']]
            }) : await this.postsRepository.findAll({
                include: { all: true },
                order: [['createdAt', 'DESC']]
            });

        }
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

    async addPostCategories(dto: AddCategoryDto,  id: number) {
        const post = await this.postsRepository.findOne({ where: { id }, include: { all: true } });
        if (!post) {
            throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        const category = await this.categoriesService.getCategoryByValue(dto.value);
        if (!category) {
            throw new HttpException(`Category with value ${dto.value} not found`, HttpStatus.NOT_FOUND);
        }
        await post.$add('categories', category.id);
        return post;
    }
}
