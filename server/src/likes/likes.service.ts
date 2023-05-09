import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './likes.model';
import { Post } from 'src/posts/posts.model';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likesRepository: typeof Like, @InjectModel(Post) private postsRepository: typeof Post) { }

  async update(postId: number, userId: number) {
    const post = await this.postsRepository.findOne({where: {id: postId}})
    if (!post) {
      throw new HttpException(`Post with ID ${postId} not found`, HttpStatus.NOT_FOUND);
    }
    const is_like = await this.likesRepository.findOne({ where: { userId, postId } })
    if (is_like) { 
      await is_like.destroy(); 
      return 'remove like' 
    }
    await this.likesRepository.create({ userId, postId });
    return 'like';
  }
}
