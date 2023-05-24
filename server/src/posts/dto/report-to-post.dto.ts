import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportPostDto {
  @ApiProperty({ example: '1', description: 'Post id' })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly postId: number;

  @ApiProperty({ example: '1', description: 'User id' })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly userId: number;

  
  @ApiProperty({ example: '18+ content', description: 'Reason reported post' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly reportReason: string;
}
