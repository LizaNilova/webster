import { Controller, Request, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../users/dto/request-user.dto';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  // create comment 
  // http://localhost:8080/api/comments/post/:id
  @UseGuards(JwtAuthGuard)
  @Post('/post/:id')
  async create(@Param('id') id: number, @Body() dto: CreateCommentDto, @Request() req: { user: RequestUserDto },) {
    return {
      comment: await this.commentsService.create({ ...dto, userId: req.user.id, postId: id }),
      message: 'Create comment'
    }
  }

  // update comment
  // http://localhost:8080/api/comments/:id
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @Request() req: { user: RequestUserDto }) {
    return {
      comment: await this.commentsService.update(id, req.user.id, updateCommentDto),
      message: 'Update comment'
    }
  }

  // delete comment
  // http://localhost:8080/api/comments/:id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req: { user: RequestUserDto }) {
    return {
      message: await this.commentsService.remove(id, req.user.id)
    }
  }
}
