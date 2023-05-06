import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserBanned } from './models/user-banned.model';
import { UserEvents } from './models/user-event.model';
import { UserEventDto } from './dto/user-event.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    @InjectModel(UserBanned) private userBennedRepository: typeof UserBanned,
    @InjectModel(UserEvents) private userEventRepository: typeof UserEvents,
  ) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async createEvent(data: UserEventDto) {
    const event = await this.userEventRepository.create(data);
    return event;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      role: user.roles[0].value,
      posts: user.posts,
      ban: user.ban,
      subscriptions: user.subscriptions
    };
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      user.$set('roles', role.id);
      return dto;
    }
    throw new HttpException('Undefined role or user', HttpStatus.NOT_FOUND);
  }

  async confirm(eventId: string, code: string): Promise<User> {
    const event = await this.userEventRepository.findByPk(eventId);
    if (!event) {
      throw new HttpException({ message: 'Session not found' }, HttpStatus.NOT_FOUND);
    }
    if (code !== event.event_content) {
      throw new HttpException({ message: 'Code do not match' }, HttpStatus.BAD_REQUEST);
    }
    await this.userEventRepository.destroy({ where: { id: eventId } });
    const user = await this.userRepository.findByPk(event.userId, { include: { all: true } });
    await user.update({ is_active: true });
    return user;
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      await this.userBennedRepository.create({
        userId: dto.userId,
        adminId: dto.adminId,
        description: dto.banReason,
      });
      return user;
    }
    throw new HttpException('user undefined', HttpStatus.NOT_FOUND);
  }
}
