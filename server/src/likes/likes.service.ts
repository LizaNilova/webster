import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './likes.model';
import { PostsService } from 'src/posts/posts.service';

interface ResultLikeDto {
  message: string;
  status: number;
}
@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likesRepository: typeof Like,
    private postService: PostsService) { }

  async likePost(postId: number, userId: number): Promise<ResultLikeDto> {
    const post = await this.postService.getById(postId);
    if (!post) {
      throw new NotFoundException('Post undefiend');
    }
    const is_like = await this.likesRepository.findOne({ where: { userId, postId } })

    if (is_like) {
      await is_like.destroy();
      return {
        message: 'remove like',
        status: 200
      }
    }
    await this.likesRepository.create({ userId, postId });
    return {
      message: 'like',
      status: 201
    }

  }
}
