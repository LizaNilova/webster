import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';

@Injectable()
export class CommentsService {
   constructor(@InjectModel(Comment) private commentsRepository: typeof Comment) { }

  async create(dto: CreateCommentDto) {
    if (!dto) {
      throw new HttpException(`No content`, HttpStatus.NOT_FOUND);
    }
    const comment = await this.commentsRepository.create({ ...dto });
    return comment;
  }

  async update(id: number, userId:number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOne({ where: { id, userId } });
    if (!comment) {
      throw new HttpException(`Comment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
     await comment.update(updateCommentDto);
    return comment;
  }

  async remove(id: number, userId: number) {
     const comment = await this.commentsRepository.findOne({ where: { id, userId} });
        if (!comment) {
            throw new HttpException(`Comment with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        await comment.destroy();
        return "Comment was deleted";
  }
}
