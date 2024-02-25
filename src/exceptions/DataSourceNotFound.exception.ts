import { HttpException, HttpStatus } from '@nestjs/common';

export class DatasourceNotFoundException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Datasource Not Found', status || HttpStatus.NOT_FOUND);
  }
}
