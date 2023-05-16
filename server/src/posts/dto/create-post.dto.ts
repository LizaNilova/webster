import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({type: 'string', required: true, example: 'Angels', description: 'Post title' })
  @IsString({ message: 'Should be a string' })
  readonly title: string;

  @ApiProperty({ type: 'string', required: true, example: 'user', description: 'Post content' })
  @IsString({ message: 'Should be a string' })
  readonly content: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true, example: ':)', description: 'Post image' })
  readonly image: Express.Multer.File;

  readonly userId: number;
  @ApiProperty({ type: 'string', required: true, example: '[]', description: 'post categories' })
  @IsArray({ message: 'Should be a string' })
  readonly category_value: string[];
}
