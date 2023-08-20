import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class EntityInvalidFilter implements ExceptionFilter {
  catch(_exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = 422;

    response.status(statusCode).json({
      statusCode,
      error: 'unprocessable_entity',
      message: 'Invalid resource',
    });
  }
}
