import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeProjectDto {
    id: number;
    @IsNotEmpty({ message: 'Is requary' })
    @IsString({ message: 'is should be string' })
    setting: string;
    userId: number;
    image: Express.Multer.File;
}