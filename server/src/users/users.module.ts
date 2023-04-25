import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserBanned } from './user-banned.model';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/posts.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, UserBanned, Post]),
    RolesModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
