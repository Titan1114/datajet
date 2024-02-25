import { HttpException, HttpStatus } from '@nestjs/common';

export class DatasourceExistsException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(
      msg || 'Could not create a duplicate datasource',
      status || HttpStatus.BAD_REQUEST,
    );
  }
}
