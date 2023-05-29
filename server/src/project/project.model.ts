import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/models/users.model';

interface ProjectCreationAttrs {

}

@Table({ tableName: 'project' })
export class Project extends Model<Project, ProjectCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.JSON, allowNull: false })
  setting: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  creator: User;
}
