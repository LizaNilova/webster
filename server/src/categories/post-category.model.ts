import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Post } from '../posts/posts.model';
import { Category } from './categories.model';

@Table({ tableName: 'post_categories', createdAt: false, updatedAt: false })
export class PostCategory extends Model<PostCategory> {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}
