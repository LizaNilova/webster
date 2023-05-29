import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.model';

@Table({ tableName: 'users_banned' })
export class UserBanned extends Model<UserBanned> {
  @ApiProperty({ example: 'user1', description: 'id user banned' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  adminId: number;

  @ApiProperty({ example: 'Post with censor +18', description: 'Reason for blocking' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @BelongsTo(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  banned: User[];
}
