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

@Table({ tableName: 'user_events' })
export class UserEvents extends Model<UserEvents> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,    
    })
    id: string;
    
    @ApiProperty({ example: 'user1', description: 'id user' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ApiProperty({ example: '4123', description: 'code activation email' })
    @Column({ type: DataType.STRING, allowNull: true })
    event_content: string;

    @BelongsTo(()=> User)
    event: User;
}
