import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/models/users.model';

interface CommentCreationAttrs {
  value: string;
  postId: number;
  userId: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @ApiProperty({ example: '1', description: 'identify ' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'This is awesome!', description: 'comment value' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  value: string;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @BelongsTo(() => Post)
  posts: Post[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User[];
}
