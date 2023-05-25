import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty({ message: 'Is requary' })
    @IsString({ message: 'is should be string' })
    name: string;
    @IsNotEmpty({ message: 'Is requary' })
    @IsString({ message: 'is should be string' })
    setting: string;
    userId: number;
    image: Express.Multer.File;
}