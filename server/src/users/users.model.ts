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
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { UserBanned } from './user-banned.model';
import { Post } from 'src/posts/posts.model';

interface UserCreationAttrs {
  login: string;
  email: string;
  password: string;
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

  @ApiProperty({ enum: ['ADMIN', 'MODERATOR', 'USER'] })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];

  @HasOne(() => UserBanned)
  ban: UserBanned[];
}
