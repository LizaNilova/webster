import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/models/users.model';
import {PostCategory} from 'src/categories/post-category.model'

interface LikeCreationAttrs {
  userId: number;
  postId: number;
}

@Table({ tableName: 'likes', createdAt: false, updatedAt: false })
export class Like extends Model<Like, LikeCreationAttrs> {

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @BelongsTo(() => Post)
  post: Post[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User[];
}
