import { environment } from '@express-rest-service/environment';
import { ConsoleLogger, Logger } from '@express-rest-service/shared';
import { atob } from '@express-rest-service/utils';
import { App } from './app/app';

const logger = new Logger(Number(environment.LOGGER_LEVEL), [new ConsoleLogger()]);
const app = new App(logger);
const connectionString = atob(environment.MONGO_CONNECTION_STRING);

app
  .connect(connectionString)
  .then(() => app.start())
  .then(() => logger.info(`App is running on http://localhost:${environment.PORT}`))
  .catch((error: Error) => {
    logger.error('Error:', error.message);
    process.exit(1);
  });
