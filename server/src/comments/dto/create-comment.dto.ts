import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'I love this', description: 'Comment value' })
  @IsString({ message: 'Should be a string' })
  readonly value: string;

  readonly postId: number;
  readonly userId: number;
}
