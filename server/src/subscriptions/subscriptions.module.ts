import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import {Subscriptions} from './subscriptions.model'

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  imports: [
    SequelizeModule.forFeature([User, Subscriptions]),
    AuthModule,
    RolesModule
  ],
  exports: [SubscriptionsService]
})
export class SubscriptionsModule {}