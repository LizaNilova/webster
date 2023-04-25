import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postsRepository : typeof Post,
    private filesService: FilesService) {}

    async create(dto: CreatePostDto, image : Express.Multer.File) {
        const filename = await this.filesService.createFile(image);
        const post = await this.postsRepository.create({...dto, image: filename});
        return post;
    }
}
