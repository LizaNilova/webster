import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './likes.model';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likesRepository: typeof Like) { }

  async update(postId: number, userId:number) {
    const is_like = await this.likesRepository.findOne({where: {userId, postId}})
    if (is_like) {await is_like.destroy(); return 'remove like'}
    else await this.likesRepository.create({ userId, postId });
    return 'like';
  }
}
