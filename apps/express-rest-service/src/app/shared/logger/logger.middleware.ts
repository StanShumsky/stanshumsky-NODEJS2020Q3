import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ILog, ILogger } from './logger.interfaces';

export function loggerMiddleware(logger: ILogger): RequestHandler {
  return async function (request: Request, response: Response, next: NextFunction): Promise<void> {
    const now = new Date();

    function handleResponse() {
      response.removeListener('finish', handleResponse);
      response.removeListener('close', handleResponse);

      const data: Partial<ILog> = {
        date: now.toISOString(),
        method: request.method,
        status: response.statusCode,
        url: request.originalUrl,
        body: request.body,
        query: request.query,
        params: request.params,
        userAgent: request.headers['user-agent'],
      };

      logger.info(JSON.stringify(data));
    }

    response.on('finish', handleResponse);
    response.on('close', handleResponse);

    try {
      next();
    } catch (error) {
      logger.error(error);
    }
  };
}
