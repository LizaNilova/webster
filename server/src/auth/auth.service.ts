import {
  HttpException,
  HttpStatus,
  Injectable,
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
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) { }

  async login(userDto: CreateUserDto): Promise<CreateTokenDto> {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateToken(user);
    return tokens;
  }

  async registration(userDto: CreateUserDto) {
    const condidateEmail = await this.userService.getUserByEmail(userDto.email);
    const condidateLogin = await this.userService.getUserByLogin(userDto.login);
    if (condidateEmail || condidateLogin) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }
    if (userDto.password !== userDto.passwordComfirm) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }
    const salt = 5;
    const hash = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser({
      ...userDto,
      password: hash,
    });
    return await this.sendCode(user);
  }

  async sendCode(user: User) {
    const code = generateCode();
    const event = await this.userService.createEvent({ 
      userId: user.id, 
      event_content: code.join('') 
    });
    await this.mailService.sendUserConfirmation(user, code);
    return {
      eventId: event.id
    }
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
      accessToken: this.jwtService.sign(accessPayload, {expiresIn: '15m'}),
      refreshToken: this.jwtService.sign(refreshPayload)
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(dto.login);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (passwordEquals && user) {
      return user;
    }
    throw new UnauthorizedException({ massage: 'Incorrect login or password' });
  }
}
