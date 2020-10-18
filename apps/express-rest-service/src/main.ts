import { ConsoleLogger, Logger } from '@express-rest-service/shared';
import { App } from './app/app';
import { environment } from './environments/environment';

const logger = new Logger(Number(environment.LOGGER_LEVEL), [new ConsoleLogger()]);
const app = new App(logger);

app
  .start()
  .then(() => logger.info(`App is running on http://localhost:${environment.PORT}`))
  .catch((error: Error) => logger.error('Error:', error.message));
