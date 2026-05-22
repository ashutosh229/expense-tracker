import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request & { requestId?: string }>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message = this.resolveMessage(exceptionResponse, exception);

    if (status >= 500) {
      this.logger.error(
        JSON.stringify({
          event: 'request_failed',
          requestId: request.requestId,
          method: request.method,
          path: request.url,
          statusCode: status,
          message,
        }),
      );
    }

    response.status(status).json({
      success: false,
      error: {
        statusCode: status,
        message,
      },
      meta: {
        requestId: request.requestId,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }

  private resolveMessage(response: unknown, exception: unknown) {
    if (typeof response === 'object' && response !== null && 'message' in response) {
      return (response as { message: unknown }).message;
    }

    if (typeof response === 'string') {
      return response;
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'Internal server error';
  }
}
