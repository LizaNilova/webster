import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/roles.model';
import { UserRoles } from '../../roles/user-roles.model';
import { UserBanned } from './user-banned.model';
import { Post } from 'src/posts/posts.model';
import { Comment } from 'src/comments/comments.model';
import { Like } from 'src/likes/likes.model';
import { UserEvents } from './user-event.model';
import { Subscriptions } from 'src/subscriptions/subscriptions.model';
import { PostReport } from 'src/posts/post-complaints.model';
import fs from 'fs'
import { Project } from 'src/project/project.model';

interface UserCreationAttrs {
  login: string;
  email: string;
  password: string;
  avatar: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'identify ' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user123', description: 'user login' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'user password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'account active' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_active: boolean

  @ApiProperty({ example: ':3', description: "User's avatar" })
  @Column({ type: DataType.STRING })
  avatar: string;

  @ApiProperty({ enum: ['ADMIN', 'MODERATOR', 'USER'] })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @HasMany(() => Comment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @HasMany(() => Like, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @HasOne(() => UserBanned, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  ban: UserBanned;

  @HasMany(() => Subscriptions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  subscriptions: Subscriptions[];

  @HasMany(() => Project, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  projects: Project[];

  @HasMany(() => UserEvents, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  events: UserEvents[];

  // @HasMany(() => PostReport)
  // reports: PostReport[];
}
