import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorCode } from '../enum/error.code';

export class ClientNotFoundException extends HttpException {
  constructor(message?: string, error?: typeof Error) {
    super(
      {
        message: error
          ? error.toString()
          : message
            ? message.toString()
            : 'not found',
        code: ErrorCode.CLIENT_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
        alerts: [],
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
