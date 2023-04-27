import { Body, Controller, Post, Request, UploadedFile, UseGuards, Delete, Patch, Get, Param } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto'
import { AddCategoryDto } from './dto/add-category.dto'
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

    constructor(private postServer: PostsService) { }

    // create post +
    // http://localhost:8080/posts
    @Post()
    @UseGuards(JwtAuthGuard)
    createPost(@Body() dto: CreatePostDto, @Request() req: { user: RequestUserDto }, @UploadedFile() image: Express.Multer.File) {
        return this.postServer.create({ ...dto, userId: req.user.id }, image);
    }

    // get all posts +
    // http://localhost:8080/posts
    @Get()
    getAll() {
        return this.postServer.getAll();
    }

    // get post by id +
    // http://localhost:8080/posts/:id_post
    @Get(':id_post')
    getById(@Param('id_post') id: number) {
        return this.postServer.getById(id);
    }

    // get user's posts (another user) +
    // http://localhost:8080/posts/:id_user
    @Get(':id_user')
    getUserPosts(@Param('id_user') id: number) {
        return this.postServer.getUserPosts(id);
    }

    // get my posts ?
    // http://localhost:8080/posts/my
    @Get('/my')
    @UseGuards(JwtAuthGuard)
    getMyPosts(@Request() req: { user: RequestUserDto }) {
        return this.postServer.getMyPosts(req.user.id);
    }

    // edit post +
    // http://localhost:8080/posts/:id_post
    @Patch(':id_post')
    @UseGuards(JwtAuthGuard)
    editPost(@Param('id_post') id: number, @Body() dto: CreatePostDto, @Request() req: { user: RequastUserDto }, @UploadedFile() image) {
        return this.postServer.editPost(dto, req.user.id, id, image);
    }

    // delete post +
    // http://localhost:8080/posts/:id_post
    @Delete(':id_post')
    // @UseGuards(JwtAuthGuard)
    deletePost(@Param('id_post') id: number, @Request() req: { user: RequestUserDto }) {
        return this.postServer.deletePost(id, req.user.id,);
    }

    // add posts categories +
    // http://localhost:8080/posts/add-category/:id_post
    @Patch('/add-category/:id_post')
    @UseGuards(JwtAuthGuard)
    addPostCategories(@Param('id_post') id: number, @Request() req: { user: RequestUserDto }, @Body() dto: AddCategoryDto) {
        return this.postServer.addPostCategories(dto, req.user.id, id);
    }
}
