import { HttpException, HttpStatus } from '@nestjs/common';

export class QueryNotFoundException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Query Not Found', status || HttpStatus.NOT_FOUND);
  }
}
