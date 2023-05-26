import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationExeprion extends HttpException {
  messages: object;

  constructor(response: object) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
