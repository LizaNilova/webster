import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ example: 'Project1', description: 'Name project' })
    @IsNotEmpty({ message: 'Is requary' })
    @IsString({ message: 'is should be string' })
    name: string;
    @ApiProperty({ example: '{ "example1": "exaple" }', description: 'Name project' })
    @IsNotEmpty({ message: 'Is requary' })
    @IsString({ message: 'is should be string' })
    setting: string;
    userId: number;
    @ApiProperty({ example: 'image)', description: 'Your loaded image' })
    image: Express.Multer.File;
}