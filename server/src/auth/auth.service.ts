import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/models/users.model';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { MailService } from '../mail/mail.service';
import generateCode from '../utils/generate-code.util';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEvents } from 'src/users/models/user-event.model';
import _ from 'lodash'
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectModel(UserEvents) private userEventsRepository: typeof UserEvents,
    @InjectModel(User) private userRepository: typeof User,
  ) { }
  async login(userDto: LoginUserDto): Promise<CreateTokenDto> {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateToken(user);
    return tokens;
  }

  async registration(userDto: CreateUserDto) {
    const isTruth = await this.userService.isExistsUser(userDto.login, userDto.email);
    const messages: any = {};
    if (isTruth.email) {
      messages.email = {
        "value": userDto.login,
        "constraints": [
          "Login is exists"
        ]
      }
    }
    if (isTruth.login) {
      messages.login = {
        "value": userDto.email,
        "constraints": [
          "Email is exists"
        ]
      }
    }
    if (userDto.password !== userDto.passwordComfirm) {
      messages.login = {
        "value1": userDto.password,
        "value2": userDto.passwordComfirm,
        "constraints": [
          "Password do not match"
        ]
      }
    }
    if (!_.isEmpty(messages)) {
      throw new BadRequestException(messages);
    }
    const user = await this.userService.createUser(userDto);
    return await this.sendCode(user);
  }

  async sendCode(user: User) {
    const code = generateCode();
    const event = await this.userService.createEvent({
      userId: user.id,
      event_content: code.join('')
    });
    await this.mailService.sendUserConfirmation(user, code);
    return event.id
  }

  async confirm(eventId: string, code: string) {
    const user = await this.userService.confirm(eventId, code);
    return await this.generateToken(user);
  }

  async refresh(refreshToken: string) {
    const payload = await this.validateToken(refreshToken);
    const user = await this.userService.getUserByIdInToken(payload.id)
    return await this.generateToken(user);
  }

  async validateToken(token: string): Promise<TokenPayloadDto> {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch {
      throw new UnauthorizedException()
    }
  }

  private async generateToken(user: User) {
    const accessPayload = { id: user.id, role: user.roles[0].value, isBanned: Boolean(user.ban) };
    const refreshPayload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(accessPayload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(refreshPayload, { expiresIn: '30d' })
    };
  }

  private async validateUser(dto: LoginUserDto) {
    const user = dto.username.includes('@') ?
      await this.userService.getUserByEmail(dto.username) :
      await this.userService.getUserByLogin(dto.username);
    if (!user) {
      throw new NotFoundException('User undefined');
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (passwordEquals) {
      return user;
    }
    if (!user.is_active) {
      throw new HttpException('User inactive account', HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException({ massage: 'Incorrect login or password' });
  }

  async forgotPassword(userDto: CreateUserDto) {
    if (!userDto.email) throw new HttpException('No content', HttpStatus.BAD_REQUEST);
    let user = await this.userService.getUserByEmail(userDto.email);
    if (!user) throw new HttpException('No users with such email', HttpStatus.BAD_REQUEST);
    const url = `${process.env.URL_CLIENT}/reset/${user.events[0].id}`;
    await this.mailService.sendUserConfirmationLink(user, url);
    return
  }

  async resetPassword(userDto: CreateUserDto, id: string) {
    if (!userDto.password || !userDto.passwordComfirm) {
      throw new HttpException('No content', HttpStatus.BAD_REQUEST);
    }
    const event = await this.userEventsRepository.findByPk(id);
    let user = await this.userRepository.findOne({ where: { id: event.userId } });
    if (!user) {
      throw new HttpException('No users with such email', HttpStatus.BAD_REQUEST);
    }
    if (userDto.password !== userDto.passwordComfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }
    const salt = 5;
    const hash = await bcrypt.hash(userDto.password, salt);
    user.password = hash;
    await user.save();
    return user
  }
}
