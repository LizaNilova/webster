import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { UserEvents } from 'src/users/models/user-event.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserEvents, User]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
