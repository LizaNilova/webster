import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { Category } from '../categories/categories.model';
import { CreatePostDto } from './dto/create-post.dto';
import { AddCategoryDto } from './dto/add-category.dto'
import { FilesService } from '../files/files.service';
import { CategoriesService } from '../categories/categories.service';
import { Op, FindOptions } from 'sequelize';
import { User } from '../users/models/users.model';
import { PostCategory } from '../categories/post-category.model';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postsRepository: typeof Post, private categoriesService: CategoriesService,
    private filesService: FilesService, @InjectModel(Category) private categoryRepository: typeof Category) { }

  async create(dto: CreatePostDto) {
    const filename = await this.filesService.createFile(dto.image);

    const existPost = await this.postsRepository.findOne({ where: { title: dto.title } });
    if (existPost) {
      throw new HttpException('Post already exists', HttpStatus.BAD_REQUEST);
    }

    const categories = await this.categoryRepository.findAll({ where: { value: { [Op.in]: dto.value } } });
    if (categories.length !== dto.value.length) {
      throw new HttpException(`One or more categories not found`, HttpStatus.NOT_FOUND);
    }

    const post = await this.postsRepository.create({ ...dto, image: filename }, { include: [{ all: true }, { model: User, attributes: ['id', 'login', 'email'] }] });
    await post.$add('categories', [...categories.map(category => category.id)]);
    await post.reload();
    return post;
  }

  async getById(id: number) {
    const post = await this.postsRepository.findByPk(id, {
      include: [
        { all: true },
        { model: Category, where: {}, attributes: ['id', 'value', 'description'] },
        { model: User, attributes: ['id', 'login', 'email'] }
      ],
    });
    return post;
  }

  async getAll(sort, filter, search) {
    filter = filter ? JSON.parse(filter) : [];

    const filterOptions: FindOptions<Post> = {
      include: [
        { all: true },
        { model: Category, where: {}, attributes: ['id', 'value', 'description'] },
        { model: User, attributes: ['id', 'login', 'email'] }
      ],
      order: (sort === 'byCategories') ? [[{ model: Category, as: 'categories' }, 'value', 'ASC']] : [['createdAt', 'DESC']],
      where: {}
    }

    if (search) {
      filterOptions.where = { title: { [Op.iLike]: `%${search}%` } };
    }

    if (filter.length > 0) {
      filterOptions.include[0].where = { value: { [Op.in]: filter } };
    }

    return await this.postsRepository.findAll(filterOptions);
  }

  async editPost(dto: CreatePostDto, userId: number, id: number, image?: any) {
    const post = await this.postsRepository.findOne({
      where: { id, userId }, include: [
        { all: true },
        { model: Category, where: {}, attributes: ['id', 'value', 'description'] },
        { model: User, attributes: ['id', 'login', 'email'] }
      ],
    });
    if (!post) {
      throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const isTruthe = await this.isTitleExists(dto.title);

    if (isTruthe) {
      throw new BadRequestException('Title is existst');
    }

    let filename: string;
    if (image) {
      filename = await this.filesService.createFile(image);
    }

    await post.update({ ...dto, image: filename });

    if (dto.value) {
      const categories = await this.categoryRepository.findAll({ where: { value: { [Op.in]: dto.value } } });
      if (categories.length !== dto.value.length) {
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

  private async isTitleExists(title: string): Promise<boolean> {
    const post = this.postsRepository.findOne({ where: { title } });
    return Boolean(post);
  }
}
