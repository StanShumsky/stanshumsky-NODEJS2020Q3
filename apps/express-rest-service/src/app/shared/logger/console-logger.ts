import { ILogger } from './logger.interfaces';

export class ConsoleLogger implements ILogger {
  log(message: unknown | string, ...args: unknown[]) {
    console.log(message, ...args);
  }

  debug(message: unknown | string, ...args: unknown[]) {
    console.debug(message, ...args);
  }

  info(message: unknown | string, ...args: unknown[]) {
    console.info(message, ...args);
  }

  warn(message?: unknown | string, ...args: unknown[]) {
    console.warn(message, ...args);
  }

  error(error?: Error | string, ...args: unknown[]) {
    console.error(error, ...args);
  }
}
