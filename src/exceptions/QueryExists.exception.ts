import { HttpException, HttpStatus } from '@nestjs/common';

export class QueryExistsException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(
      msg || 'Could not create a duplicate query',
      status || HttpStatus.BAD_REQUEST,
    );
  }
}
