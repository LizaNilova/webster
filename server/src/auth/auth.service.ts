import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/models/users.model';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { MailService } from 'src/mail/mail.service';
import generateCode from '../utils/generate-code.util';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) { }

  async login(userDto: LoginUserDto): Promise<CreateTokenDto> {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateToken(user);
    return tokens;
  }

  async registration(userDto: CreateUserDto) {
    const isTruth = await this.userService.isExistsUser(userDto.login, userDto.email);
    if (isTruth) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }
    if (userDto.password !== userDto.passwordComfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
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
    const user = await this.userService.getUserByLogin(payload.login)
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
    const accessPayload = { id: user.id, login: user.login, role: user.roles[0].value, isBanned: Boolean(user.ban) };
    const refreshPayload = { login: user.login };
    return {
      accessToken: this.jwtService.sign(accessPayload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(refreshPayload)
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
}
