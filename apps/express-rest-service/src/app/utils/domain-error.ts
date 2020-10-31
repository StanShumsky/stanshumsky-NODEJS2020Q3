import {
  DomainError,
  EntityNotFoundError,
  ForbiddenError,
  InternalError,
  UnauthorizedError,
} from '@express-rest-service/shared';
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

    if (error instanceof UnauthorizedError) {
      response.status(401).send({ message: error.message });
      return next();
    }

    if (error instanceof ForbiddenError) {
      response.status(403).send({ message: error.message });
      return next();
    }
  }

  response.status(500).send({ message: 'Oops, Something Went Wrong...' });
  return next(error);
}
