import { Body, Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from 'src/users/dto/request-user.dto';

@Controller('posts')
export class PostsController {

    constructor(private postServer: PostsService){}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    createPost(@Body() dto: CreatePostDto, @Request() req: {user: RequestUserDto},
    @UploadedFile() image: Express.Multer.File) {
        return this.postServer.create({...dto, userId: req.user.id}, image);
    }  
}

