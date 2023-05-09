import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentsRepository: typeof Comment,
    private potsService: PostsService) { }

  async create(dto: CreateCommentDto) {
    const post = await this.potsService.getById(dto.postId);
    if (!post) {
      throw new NotFoundException('Post undefined');
    }
    const comment = await this.commentsRepository.create({ ...dto });
    return comment;
  }

  async update(dto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOne({ where: { id: dto.commentId, userId: dto.userId } });
    if (!comment) {
      throw new HttpException(`Comment with ID ${dto.commentId} not found`, HttpStatus.NOT_FOUND);
    }
    await comment.update({ value: dto.value });
    return comment;
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentsRepository.findOne({ where: { id, userId } });
    if (!comment) {
      throw new HttpException(`Comment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await comment.destroy();
    return "Comment was deleted";
  }
}
