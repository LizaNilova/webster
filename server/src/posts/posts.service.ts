import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { Category } from 'src/categories/categories.model';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from '../files/files.service';
import { CategoriesService } from '../categories/categories.service';
import { Op, FindOptions } from 'sequelize';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postsRepository: typeof Post,
        private filesService: FilesService, @InjectModel(Category) private categoryRepository: typeof Category) { }

    async create(dto: CreatePostDto, image: Express.Multer.File) {
        if (!image || !dto.title || !dto.category_value) {
            throw new HttpException('Missing required parameters', HttpStatus.BAD_REQUEST);
        }

        const filename = await this.filesService.createFile(image);
       
        const existPost = await this.postsRepository.findOne({ where: { title: dto.title } });
        if (existPost) {
            throw new HttpException('Post already exists', HttpStatus.BAD_REQUEST);
        }

        const categories = await this.categoryRepository.findAll({ where: { value: { [Op.in]: dto.category_value } } });
        if (categories.length !== dto.category_value.length) {
            throw new HttpException(`One or more categories not found`, HttpStatus.NOT_FOUND);
        }

        const post = await this.postsRepository.create({ ...dto, image: filename }, { include: { all: true } });
        await post.$add('categories', [...categories.map(category => category.id)]);
        await post.reload();
        return { post };
    }

    async getById(id: number) {
        const post = await this.postsRepository.findByPk(id, { include: { all: true } });
        if (!post) {
            throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return post;
    }

    async getAll(sort, filter, search) {
        filter = filter ? JSON.parse(filter) : [];

        const filterOptions: FindOptions<Post> = {
            include: (filter.length > 0) ? [{ model: Category, where: {} }, { all: true }] : { all: true },
            order: (sort === 'byCategories') ? [[{ model: Category, as: 'categories' }, 'value', 'ASC']] : [['createdAt', 'DESC']],
            where: {}
        }

           console.log(filterOptions)

        if (search) {
            filterOptions.where = { title: { [Op.iLike]: `%${search}%` } };
        }

        if (filter.length > 0) {
            filterOptions.include[0].where = { value: { [Op.in]: filter } };
        }

        return await this.postsRepository.findAll(filterOptions);
    }

    async editPost(dto: CreatePostDto, userId: number, id: number, image?: any) {
        let post = await this.postsRepository.findOne({ where: { id, userId }, include: { all: true } });
        if (!post) {
            throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        let filename;
        if (image) {
            filename = await this.filesService.createFile(image);
        }

        await post.update({ ...dto, image: filename });

        if (dto.category_value) {
            const categories = await this.categoryRepository.findAll({ where: { value: { [Op.in]: dto.category_value } } });
            if (categories.length !== dto.category_value.length) {
                throw new HttpException(`One or more categories not found`, HttpStatus.NOT_FOUND);
            }
            await post.$set('categories', [...categories.map(category => category.id)]);
            await post.reload();
        }

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
}
