import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestTracingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestTracingMiddleware.name);

  use(
    request: Request & { requestId?: string },
    response: Response,
    next: NextFunction,
  ) {
    const startedAt = Date.now();
    const requestId = request.header('x-request-id') ?? randomUUID();
    request.requestId = requestId;
    response.setHeader('x-request-id', requestId);

    response.on('finish', () => {
      this.logger.log(
        JSON.stringify({
          event: 'http_request',
          requestId,
          method: request.method,
          path: request.originalUrl,
          statusCode: response.statusCode,
          durationMs: Date.now() - startedAt,
        }),
      );
    });

    next();
  }
}
