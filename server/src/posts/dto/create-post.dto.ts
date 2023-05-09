import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly image: string;
  readonly userId: number;
  readonly category_value: string[];
}
