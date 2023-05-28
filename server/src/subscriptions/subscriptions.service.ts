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
      const sub = this.find_subs_sups(dto.userId)
      return {
        message: 'remove subscription',
        subscribers: (await sub).usersSubscriber,
        subscriptions: (await sub).subscriptions_with_avas,
        status: 200
      }
    }

    await this.subscriptionsRepository.create({ userId: dto.authorId, subscriberId: dto.userId });
    const sub = this.find_subs_sups(dto.userId)
    return {
      message: 'subscribed', 
      subscribers: (await sub).usersSubscriber,
        subscriptions: (await sub).subscriptions_with_avas,
      status: 201
    };
  }

  async find_subs_sups(userId: number) {
    const [subscriptions, subscribers] = await Promise.all([
      this.subscriptionsRepository.findAll({ where: { subscriberId: userId } }),
      this.subscriptionsRepository.findAll({ where: { userId: userId } })
    ]);
    let usersSubscriber = []
    let subscriptions_with_avas = []
    for (const subscriber of subscribers) {
      usersSubscriber.push(await this.userRepository.findByPk(subscriber.subscriberId, {
        attributes: ['id', 'login', 'avatar']
      }));
    };
    for (const subscription of subscriptions) {
    subscriptions_with_avas.push(await this.userRepository.findByPk(subscription.userId, {
        attributes: ['id', 'login', 'avatar']
      }));
    }
    return {usersSubscriber, subscriptions_with_avas}
  }
}
