import { Body, Controller, Post, Request, UploadedFile, UseGuards, Delete, Patch, Get, Param, UseInterceptors, Query  } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/posts')
export class PostsController {

    constructor(private postServer: PostsService) { }

    // create post +
    // http://localhost:8080/posts
    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, 
    @Request() req: { user: RequestUserDto },
    @UploadedFile() image: Express.Multer.File) {
        return this.postServer.create({ ...dto, userId: req.user.id }, image);
    }

    // get all posts their categories and comments +
    // http://localhost:8080/posts
    @Get()
    getAll(@Query('sort') sort: 'dateCreated' | 'byCategories', @Query('filter') filter: string[], @Query('search') search: string) {
        return this.postServer.getAll(sort, filter, search);
    }

    // get post, its categories and comments by id +
    // http://localhost:8080/posts/:id_post
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.postServer.getById(id);
    }

    // edit post +
    // http://localhost:8080/posts/:id_post
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    editPost(@Param('id') id: number,
        @Body() dto: CreatePostDto,
        @Request() req: { user: RequestUserDto },
        @UploadedFile() image: Express.Multer.File) {
        return this.postServer.editPost(dto, req.user.id, id, image);
    }

    // delete post +
    // http://localhost:8080/posts/:id_post
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deletePost(@Param('id') id: number, @Request() req: { user: RequestUserDto }) {
        return this.postServer.deletePost(id, req.user.id,);
    }
    
}
