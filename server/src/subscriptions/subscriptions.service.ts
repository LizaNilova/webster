import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Subscriptions } from './subscriptions.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { CreateSubDto } from './dto/create-sub.dto';
import { ResponseSubDto } from './dto/response-sub.dto';

@Injectable()
export class SubscriptionsService {
  constructor(@InjectModel(Subscriptions) private subscriptionsRepository: typeof Subscriptions,
    @InjectModel(User) private userRepository: typeof User) { }

  async subscribeTo(dto: CreateSubDto): Promise<ResponseSubDto> {
    console.log(dto)
    if (Number(dto.userId) === Number(dto.authorId)) {
      throw new BadRequestException("You can't subscribe to yourself")
    }
    const user_login = await this.userRepository.findOne({ where: { id: dto.authorId } })
    if (!user_login) {
      throw new NotFoundException('Undefined user');
    }
    const is_subscribed = await this.subscriptionsRepository.findOne({ where: { userId: dto.authorId, subscriberId: dto.userId } })
    if (is_subscribed) {
      await is_subscribed.destroy();
      return {
        message: 'remove subscription',
        status: 200
      }
    }
    await this.subscriptionsRepository.create({ userId: dto.authorId, subscriberId: dto.userId, login: user_login.login });
    return {
      message: 'subscribed', 
      status: 201
    };
  }
}
