import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'I love this', description: 'Comment value' })
  @IsString({ message: 'Should be a string' })
  readonly value: string;
  
  readonly commentId: number;
  readonly userId: number;
}