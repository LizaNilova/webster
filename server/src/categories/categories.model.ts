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
import { Post } from 'src/posts/posts.model';
import {PostCategory} from 'src/categories/post-category.model'

interface CategoryCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '1', description: 'identify ' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Portrait', description: 'category value' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: "Portraits are pictures that depict a person or group of people, often emphasizing the subject's face and expressions.", description: 'category description' })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  description: string;

  @BelongsToMany(() => Post, () => PostCategory)
  posts: Post[];
}
