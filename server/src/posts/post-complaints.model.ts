import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/models/users.model';
import { Post } from './posts.model';


@Table({ tableName: 'posts_reported' })
export class PostReport extends Model<PostReport> {
  @ApiProperty({ example: 'post1', description: 'id post reported' })
  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({ example: 'Post with censor +18', description: 'Reason for blocking' })
  @Column({ type: DataType.STRING, allowNull: true })
  reportReason: string;

  @BelongsTo(() => Post)
  reportedPost: Post;

  @BelongsTo(() => User)
  user: User;
}
