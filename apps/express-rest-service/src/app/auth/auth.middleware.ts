import { UnauthorizedError } from '@express-rest-service/shared';
import { verifyAuthorizationHeader } from '@express-rest-service/utils';
import { NextFunction, Request, Response } from 'express';

export async function authMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const { authorization } = request.headers;
    await verifyAuthorizationHeader(authorization);
    next();
  } catch {
    next(new UnauthorizedError());
  }
}
