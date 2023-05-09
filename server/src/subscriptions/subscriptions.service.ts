import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Subscriptions } from './subscriptions.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';

@Injectable()
export class SubscriptionsService {
  constructor(@InjectModel(Subscriptions) private subscriptionsRepository: typeof Subscriptions,  @InjectModel(User) private userRepository: typeof User) { }
  async subscribeTo(myId: number, toUser: number) {
    const user_login = await this.userRepository.findOne({where: {id: toUser}})
    if (!user_login) {
      throw new HttpException(`User with ID ${toUser} not found`, HttpStatus.NOT_FOUND);
    }
    const is_subscribed = await this.subscriptionsRepository.findOne({ where: { userId: toUser, subscriberId: myId} })
    if (is_subscribed) { 
      await is_subscribed.destroy(); 
      return 'remove subscription' 
    }
    await this.subscriptionsRepository.create({ userId: toUser, subscriberId: myId, login: user_login.login});
    return 'subscribed';
  }
}
