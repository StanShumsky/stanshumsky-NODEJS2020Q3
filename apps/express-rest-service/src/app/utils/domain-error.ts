import { DomainError, EntityNotFoundError, InternalError } from '@express-rest-service/shared';
import { NextFunction, Request, Response } from 'express';

export function mapDomainErrorToHttpResponse(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (error instanceof DomainError) {
    if (response.headersSent) {
      return next();
    }

    if (error instanceof EntityNotFoundError) {
      response.status(404).json({ message: error.message, error: error.meta });
      return next();
    }

    if (error instanceof InternalError) {
      response.status(500).send({ message: error.message, error: error.meta });
      return next();
    }
  }

  response.status(500).send({ message: 'Oops, Something Went Wrong...' });
  return next(error);
}
