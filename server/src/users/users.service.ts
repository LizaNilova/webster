import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserBanned } from './models/user-banned.model';
import { UserEvents } from './models/user-event.model';
import { UserEventDto } from './dto/user-event.dto';
import * as bcrypt from 'bcryptjs'
import { MailService } from '../mail/mail.service';
import generateCode from '../utils/generate-code.util';
import { Like } from 'src/likes/likes.model';
import { Subscriptions } from 'src/subscriptions/subscriptions.model';
import { hasSubscribers } from 'diagnostics_channel';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';
import * as fsp from 'fs/promises';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserBanned) private userBennedRepository: typeof UserBanned,
    @InjectModel(UserEvents) private userEventRepository: typeof UserEvents,
    @InjectModel(Like) private likeRepository: typeof Like,
    @InjectModel(Subscriptions) private subscriptionsRepository: typeof Subscriptions,
    private roleService: RolesService,
    private mailService: MailService,
    private filesService: FilesService,
  ) { }

  async createUser(dto: CreateUserDto) {
    const isTruth = await this.isExistsUser(dto.login, dto.email);
    if (isTruth) {
      throw new BadRequestException('User exists');
    }
    const salt = 5;
    const hash = await bcrypt.hash(dto.password, salt);
    const user = await this.userRepository.create({ ...dto, password: hash });
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    const filePath = 'images/avatar.jpg';
    const fileBuffer = await fsp.readFile(filePath);
    const fileName = await this.filesService.createAvatar(fileBuffer);
    user.avatar = fileName;
    
    user.save()
    return user;
  }

  async createEvent(data: UserEventDto) {
    if (!data) {
      throw new HttpException(`No content`, HttpStatus.NOT_FOUND);
    }
    const event = await this.userEventRepository.create(data);
    return event;
  }

  // добавить сортировку по рейтингу 
  async getAllUsers(search) {

    const users = (search) ? await this.userRepository.findAll({ where: {
        login: {
          [Op.iLike]: `%${search}%`
        }
      },
      include: { all: true }}) :
       await this.userRepository.findAll({ include: { all: true } });
  

    const usersWithRating = [];

    for (const user of users) {
      const postIds = user.posts.map((post) => post.id);

      const likes = await this.likeRepository.findAll({ where: { postId: postIds } });
      let rating = likes.length;

      const subscribers = await this.subscriptionsRepository.findAll({ where: { userId: user.id } });
      rating += subscribers.length;

      const subscriberIds = subscribers.map((subscriber) => subscriber.subscriberId);
      const subscribersWithLogin = await this.userRepository.findAll({
        where: { id: subscriberIds },
        attributes: ['id', 'login']
      });

      const userWithRating = {
        id: user.id,
        login: user.login,
        email: user.email,
        role: user.roles[0].value,
        rating: rating,
        posts: user.posts,
        ban: user.ban,
        subscriptions: user.subscriptions,
        subscribers: subscribersWithLogin
      };

      usersWithRating.push(userWithRating);
    }
    return usersWithRating.sort((a, b) => b.rating - a.rating);
  }

  // добавить рейтинг
  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, { include: { all: true } });
    if (!user) {
      throw new NotFoundException('User undefined');
    }

    const postIds = user.posts.map((post) => post.id);

    const likes = await this.likeRepository.findAll({where: { postId: postIds,}})
    let rating = likes.length
    const subscribers = await this.subscriptionsRepository.findAll({where: {userId: id}})
    rating += subscribers.length   

    let usersSubscriber  = []
      for (const subscriber of subscribers)  {
        usersSubscriber.push(await this.userRepository.findByPk(subscriber.subscriberId, {
          attributes: ['id', 'login']
        }));
      };

    return {
      id: user.id,
      login: user.login,
      email: user.email,
      avatar: user.avatar,
      role: user.roles[0].value,
      rating: rating,
      posts: user.posts,
      ban: user.ban,
      subscriptions: user.subscriptions,
      subscribers: usersSubscriber, 
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
      throw new NotFoundException({ message: 'Session not found' });
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

  async edit_profile(id: number, dto: EditUserDto, avatar?: any){
    let user = await this.userRepository.findOne({ where: { id }});
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (dto.login) {
      user.login = dto.login;
    }

    console.log(user.password, dto.oldPassword)
    if (dto.password) {
      if (!(await bcrypt.compare(dto.oldPassword, user.password))) {
        throw new HttpException("old password and your password don't matched", HttpStatus.BAD_REQUEST);
      }
      if (dto.password !== dto.passwordComfirm) {
        throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
      }
      const salt = 5;
      const hash = await bcrypt.hash(dto.password, salt);
      user.password = hash; // Update the password
    }

    if (avatar) {
      user.avatar = await this.filesService.createFile(avatar);
    }

    if (dto.email) {
      user.email = dto.email; 
      user.is_active = false;
      await user.save();
      return await this.sendCode(user);
    }

    await user.save();
    return user;
  }

  async sendCode(user: User) {
    const code = generateCode();
    const event = await this.createEvent({
      userId: user.id,
      event_content: code.join('')
    });
    await this.mailService.sendUserConfirmation(user, code);
    const id = event.id
    return {event_id: id}
  }

  async delete_profile(id: number){
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return "User was deleted";
}

  async isExistsUser(login: string, email: string): Promise<boolean> {
    const condidateEmail = await this.getUserByEmail(email);
    const condidateLogin = await this.getUserByLogin(login);
    return Boolean(condidateEmail || condidateLogin);
  }
}
