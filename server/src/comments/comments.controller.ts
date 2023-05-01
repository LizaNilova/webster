import { Controller, Request, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../users/dto/request-user.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // create comment 
  // http://localhost:8080/comments/post/:id
  @UseGuards(JwtAuthGuard)
  @Post('/post/:id')
  create(@Param('id') id: number, @Body() dto: CreateCommentDto, @Request() req: { user: RequestUserDto },) {
    return this.commentsService.create({ ...dto, userId: req.user.id, postId: id });
  }

  // update comment
  // http://localhost:8080/comments/:id
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @Request() req: { user: RequestUserDto }) {
    return this.commentsService.update(id, req.user.id, updateCommentDto);
  }

  // delete comment
  // http://localhost:8080/comments/:id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req: { user: RequestUserDto }) {
    return this.commentsService.remove(id, req.user.id,);
  }
}
