import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';

interface SubscribeCreationAttrs {
  login: string;
  subscriberId: number;
  userId: number;
}

@Table({ tableName: 'subscriptions', createdAt: false, updatedAt: false })
export class Subscriptions extends Model<Subscriptions, SubscribeCreationAttrs> {
  @Column({ type: DataType.STRING })
  login: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  subscriberId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  subscribers: User[];
}