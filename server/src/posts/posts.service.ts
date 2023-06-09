import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { Category } from '../categories/categories.model';
import { Comment } from 'src/comments/comments.model';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from '../files/files.service';
import { CategoriesService } from '../categories/categories.service';
import { Op, FindOptions } from 'sequelize';
import { User } from '../users/models/users.model';
import { PostReport } from 'src/posts/post-complaints.model';
import { ReportPostDto } from './dto/report-to-post.dto';
import * as fsp from 'fs/promises';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postsRepository: typeof Post, @InjectModel(PostReport) private postReportRepository: typeof PostReport,
    private filesService: FilesService, @InjectModel(Category) private categoryRepository: typeof Category) { }

  async create(dto: CreatePostDto) {
    const filename = await this.filesService.createFile(dto.image);

    const existPost = await this.postsRepository.findOne({ where: { title: dto.title } });
    if (existPost) {
      throw new HttpException('Post already exists', HttpStatus.BAD_REQUEST);
    }

    const categories = await this.categoryRepository.findAll({ where: { value: { [Op.in]: dto.category_value } } });
    if (categories.length !== dto.category_value.length) {
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
        { model: Category, through: { attributes: [] }, where: {}, attributes: ['value'] },
        { model: User, attributes: ['id', 'login', 'email'] }
      ],
    });

    const categories = post.categories.map(({ value }) => value);
    console.log(categories)

    if (post) 
      post.comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const post_with_categories = {
      id: post.id,
      title: post.title, 
      content: post.content, 
      image: post.image, 
      createdAt: post.createdAt,
      updatedAt: post.updatedAt, 
      categories: categories,
      author: post.author, 
      comments: post.comments, 
      likes:post.likes
    }
  
    return post_with_categories;
  }

  async getMyPosts(userId: number, page: number) {
    const parsedPage = page ? page : 1;
    const perPage = 10;
    
    const posts = await this.postsRepository.findAll({where:{userId}, order: [['createdAt', 'DESC']], include: [{ all: true }, { model: Comment, attributes: ['id', 'value', 'postId', 'createdAt'], include: [{ model: User, attributes: ['id', 'login', 'email', 'avatar']}] }]})

    if (!posts) {
      throw new HttpException(`Post with user ID ${userId} not found`, HttpStatus.NOT_FOUND);
    }

    const postChanged = posts.map((post)=> ({
        id: post.id,
        title: post.title, 
        content: post.content, 
        image: post.image, 
        createdAt: post.createdAt,
        updatedAt: post.updatedAt, 
        categories: post.categories.map(({value})=>value), 
        author: post.author, 
        comments: post.comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()), 
        likes:post.likes

    }))
    
    const totalPages = Math.ceil(postChanged.length / perPage);
    const postFilter = postChanged.slice(
      parsedPage * perPage - perPage,
      parsedPage * perPage
    );
    return {
      meta: { page: page || 1, perPage: Number(perPage), totalPages },
      posts: postFilter,
      message: 'Success'
    }
  }

  async getAll(sort, filter, search, page: number) {
    filter = filter ? JSON.parse(filter) : [];
    const parsedPage = page ? page : 1;
    const perPage = 10;

    
    const filterOptions: FindOptions<Post> = {
      include: [
        { all: true },
        { model: Category, through: { attributes: [] }, where: {}, attributes: ['value'] },
        { model: User, attributes: ['id', 'login', 'email'] },
        { model: Comment, attributes: ['id', 'value', 'postId', 'createdAt'], include: [{ model: User, attributes: ['id', 'login', 'email', 'avatar']}] }
      ],
      order: (sort === 'byCategories') ? [[{ model: Category, as: 'categories' }, 'value', 'ASC']] : [['createdAt', 'DESC']],
      where: {}
    }
    if (search) {
      filterOptions.where = { title: { [Op.iLike]: `%${search}%` } };
    }

    if (filter.length > 0) {
      filterOptions.include[1].where = { value: { [Op.in]: filter } };
    }
    
    const posts = await this.postsRepository.findAll(filterOptions)

    const postChanged = posts.map((post)=> ({
        id: post.id,
        title: post.title, 
        content: post.content, 
        image: post.image, 
        createdAt: post.createdAt,
        updatedAt: post.updatedAt, 
        categories: post.categories.map(({value})=>value), 
        author: post.author, 
        comments: post.comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()), 
        likes:post.likes

      }))
    
    const totalPages = Math.ceil(postChanged.length / perPage);
    const postFilter = postChanged.slice(
      parsedPage * perPage - perPage,
      parsedPage * perPage
    );
    return {
      meta: { page: page || 1, perPage: Number(perPage), totalPages },
      posts: postFilter,
      message: 'Success'
    }
  }

  async editPost(dto: CreatePostDto, userId: number, id: number, image?: any) {
    console.log(dto)
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
    const isTruthe = await this.isTitleExists(dto.title, id);

    if (isTruthe) {
      throw new BadRequestException('Title is existst');
    }

    let filename: string;
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
    let post = await this.postsRepository.findOne({ where: { id, userId } });
    if (!post) {
      throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await post.destroy();
    return "Post was deleted";
  }

  async banPost(id: number) {
    let post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const filePath = 'images/ban-images.jpg';
    const fileBuffer = await fsp.readFile(filePath);
    const fileName = await this.filesService.createAvatar(fileBuffer);
    await post.update({ image: fileName }); // вот тут заменить фотографию на фотографию ban-images.jpg из папки images
    await this.postReportRepository.destroy({where:{postId: id}})
    return "Post was banned";
  }

  private async isTitleExists(title: string, id: number): Promise<boolean> {
    const post = await this.postsRepository.findOne({ where: { title } });
    if (post?.title === title && post.id === Number(id)) {
      return false;
    }
    return Boolean(post);
  }

  async reportPost(dto: ReportPostDto, ) {
    let post = await this.postsRepository.findOne({ where: {id: dto.postId} });
    if (!post) {
      throw new HttpException(`Post with ID ${dto.postId} not found`, HttpStatus.NOT_FOUND);
    }
    if(await this.postReportRepository.findOne({where:{userId: dto.userId, postId:dto.postId}})){
      throw new HttpException('You already reported about this post', HttpStatus.BAD_REQUEST);
    }
    const report = await this.postReportRepository.create({
      userId: dto.userId,
      postId: dto.postId,
      reportReason: dto.reportReason,
    });
    return report;
  }

  async getAllReportedPosts(page: number){
    const parsedPage = page ? page : 1;
    const perPage = 10;
    const reports = await this.postReportRepository.findAll({
      include: [
        { all: true },
        { model: Post, include: [{ all: true }] }
      ],
      order: [['createdAt', 'ASC']]
    })
     const totalPages = Math.ceil(reports.length / perPage);
    const postFilter = reports.slice(
      parsedPage * perPage - perPage,
      parsedPage * perPage
    );
    return {
      meta: { page: page || 1, perPage: Number(perPage), totalPages },
      posts: postFilter,
      message: 'Success'
    }
  }
}
