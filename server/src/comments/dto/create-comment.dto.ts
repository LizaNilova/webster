import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'I love this', description: 'Comment value' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly value: string;

  readonly postId: number;
  readonly userId: number;
}
