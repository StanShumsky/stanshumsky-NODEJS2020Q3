import { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncHandler() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
      configurable: true,

      get(): RequestHandler {
        const boundFn = descriptor.value?.bind(this);

        Reflect.defineProperty(this, propertyKey, {
          value: boundFn,
          configurable: true,
          writable: true,
        });

        return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
            await boundFn(req, res, next);
          } catch (error) {
            next(error);
          }
        };
      },
    };
  };
}
