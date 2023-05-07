import { Body, Controller, Post, Request, UploadedFile, UseGuards, Delete, Patch, Get, Param, UseInterceptors, Query } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/posts')
export class PostsController {

    constructor(private postServer: PostsService) { }

    // create post +
    // http://localhost:8080/api/posts
    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createPost(@Body() dto: CreatePostDto,
        @Request() req: { user: RequestUserDto },
        @UploadedFile() image: Express.Multer.File) {
        return {
            post: await this.postServer.create({ ...dto, userId: req.user.id }, image),
            message: 'Create post'
        };
    }

    // get all posts their categories and comments +
    // http://localhost:8080/api/posts
    @Get()
    async getAll(@Query('sort') sort: 'dateCreated' | 'byCategories', @Query('filter') filter: string[], @Query('search') search: string) {
        return {
            posts: await this.postServer.getAll(sort, filter, search),
            message: 'Success'
        };
    }

    // get post, its categories and comments by id +
    // http://localhost:8080/api/posts/:id_post
    @Get(':id')
    async getById(@Param('id') id: number) {
        return {
            post: await this.postServer.getById(id),
            message: 'Success'
        };
    }

    // edit post +
    // http://localhost:8080/api/posts/:id_post
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async editPost(@Param('id') id: number,
        @Body() dto: CreatePostDto,
        @Request() req: { user: RequestUserDto },
        @UploadedFile() image: Express.Multer.File) {
        return {
            post: await this.postServer.editPost(dto, req.user.id, id, image),
            message: 'Update post'
        };
    }

    // delete post +
    // http://localhost:8080/api/posts/:id_post
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deletePost(@Param('id') id: number, @Request() req: { user: RequestUserDto }) {
        return {
            message: await this.postServer.deletePost(id, req.user.id,)
        };
    }

}
