import { ILogger, LoggerLevel } from './logger.interfaces';

export class Logger implements ILogger {
  constructor(private level: LoggerLevel = 0, private channels: ILogger[]) {}

  private write(level: LoggerLevel, message?: unknown | string, ...args: unknown[]): void {
    if (this.level !== LoggerLevel.OFF && level >= this.level) {
      const levelName = this.levelToString(level);
      this.channels.forEach((channel: ILogger) => channel[levelName](message, ...args));
    }
  }

  private levelToString(level: LoggerLevel): string {
    switch (level) {
      case 1:
        return 'log';
      case 2:
        return 'debug';
      case 3:
        return 'info';
      case 4:
        return 'warn';
      case 5:
        return 'error';
    }
  }

  log(message?: unknown | string, ...args: unknown[]): void {
    this.write(LoggerLevel.LOG, message, ...args);
  }

  debug(message?: unknown | string, ...args: unknown[]): void {
    this.write(LoggerLevel.DEBUG, message, ...args);
  }

  info(message?: unknown | string, ...args: unknown[]): void {
    this.write(LoggerLevel.INFO, message, ...args);
  }

  warn(message?: unknown | string, ...args: unknown[]): void {
    this.write(LoggerLevel.WARN, message, ...args);
  }

  error(error?: Error | string, ...args: unknown[]): void {
    this.write(LoggerLevel.ERROR, error, ...args);
  }
}
