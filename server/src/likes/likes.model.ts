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

@Table({ tableName: 'likes' })
export class Like extends Model<Like, LikeCreationAttrs> {
  @ApiProperty({ example: '1', description: 'identify ' })
  @Column({
    type: DataType.INTEGER,
    unique: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
