import { Body, Controller, Post, Request, UploadedFile, UseGuards } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequastUserDto } from 'src/users/dto/requast-user.dto';

@Controller('posts')
export class PostsController {

    constructor(private postServer: PostsService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    createPost(@Body() dto: CreatePostDto, @Request() req: {user: RequastUserDto},
                @UploadedFile() image) {
        return this.postServer.create({...dto, userId: req.user.id}, image);
    }  
}
