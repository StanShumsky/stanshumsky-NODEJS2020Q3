export interface ILogger {
  log(message: unknown | string, ...params: unknown[]): void;
  debug(message: unknown | string, ...params: unknown[]): void;
  info(message: unknown | string, ...params: unknown[]): void;
  warn(message: unknown | string, ...params: unknown[]): void;
  error(error: Error | string, ...params: unknown[]): void;
}

export interface ILog {
  date: string;
  status: number;
  method: string;
  url: string;
  body: unknown;
  query: unknown;
  params: unknown;
  userAgent: string;
}

export enum LoggerLevel {
  OFF = 0,
  LOG,
  DEBUG,
  INFO,
  WARN,
  ERROR,
}
