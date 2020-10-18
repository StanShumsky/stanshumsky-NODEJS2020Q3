export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class EntityNotFoundError extends DomainError {
  public meta: { resource: string; query: unknown };

  constructor(resource: string, query: unknown) {
    super(`${resource} was not found.`);
    this.meta = { resource, query };
  }
}

export class InternalError extends DomainError {
  public meta: { error: Error };

  constructor(error: Error) {
    super(error.message);
    this.meta = { error };
  }
}
