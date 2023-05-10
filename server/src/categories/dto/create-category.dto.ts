import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Cat', description: 'Title category' })
  @IsString({ message: 'Should be a string' })
  readonly value: string;

  @ApiProperty({ example: 'Its very cute animal :)', description: 'Description category' })
  @IsString({ message: 'Should be a string' })
  readonly description: string;
}

