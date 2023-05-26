import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Cat', description: 'Title category' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly value: string;

  @ApiProperty({ example: 'Its very cute animal :)', description: 'Description category' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({message: 'Is not empty!'})
  readonly description: string;
}

