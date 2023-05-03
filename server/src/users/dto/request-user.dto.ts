import { ApiProperty } from '@nestjs/swagger';

export class RequestUserDto {
    @ApiProperty({ example: '1', description: 'User id' })
    readonly id: number;

    @ApiProperty({ example: 'user', description: 'User login' })
    readonly login: string;

    @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
    readonly email: string;
}
