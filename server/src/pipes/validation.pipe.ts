import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationExeprion } from '../exeption/validation.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const plain = plainToClass(metadata.metatype, value);
    const errors = await validate(plain);

    if (errors.length) {
      const messages = errors.reduce(
        (acc: object, error) => ({
          ...acc,
          [error.property]: {
            value: `${error.value}`,
            constraints: Object.values(error.constraints)
          },
        }),
        {},
      );
      throw new ValidationExeprion(messages);
    }
    return value;
  }
}
