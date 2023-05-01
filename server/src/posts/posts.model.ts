import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsToMany, 
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Category } from 'src/categories/categories.model';
import { PostCategory } from 'src/categories/post-category.model';
import {Comment} from 'src/comments/comments.model';
import { Like } from 'src/likes/likes.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'identify ' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'I love unicorn', description: 'Title this post' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({
    example:
      'The unicorn, or inrog, is a mythical creature that since ancient times has been described as a kind of hoofed animal, most often a horse, with one large, pointed, spiral-shaped horn coming out of its forehead.',
    description: 'Content this post',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  content: string;

  @ApiProperty({ example: ':(', description: 'Image this post' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Category, () => PostCategory)
  categories: Category[];

   @HasMany(() => Comment)
  comments: Comment[];

   @HasMany(() => Like)
  likes: Like[];
}
