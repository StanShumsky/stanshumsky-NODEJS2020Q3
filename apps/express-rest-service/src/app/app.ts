import { boardRouter } from '@express-rest-service/boards';
import { ILogger, loggerMiddleware } from '@express-rest-service/shared';
import { taskRouter } from '@express-rest-service/tasks';
import { userRouter } from '@express-rest-service/users';
import { mapDomainErrorToHttpResponse } from '@express-rest-service/utils';
import * as express from 'express';
import { Server } from 'net';
import { join } from 'path';
import * as swagger from 'swagger-ui-express';
import * as yaml from 'yamljs';
import { environment } from '../environments/environment';

export class App {
  private app = express();
  private server: Server;

  constructor(private logger: ILogger) {
    this.app.use(express.json());

    process.on('unhandledRejection', (reason: string) => logger.error(reason));
    process.on('uncaughtException', (error: Error) => {
      logger.error('Error:', error.message);
      process.exit(1);
    });
  }

  public async start(): Promise<Server> {
    const swaggerDocument = yaml.load(join(__dirname, './assets/doc/api.yaml'));
    this.app.use('/doc', swagger.serve, swagger.setup(swaggerDocument));

    this.app.use('/', (req, res, next) => {
      if (req.originalUrl === '/') {
        return res.send('Service is running!');
      }
      next();
    });

    this.app.use(loggerMiddleware(this.logger));

    this.app.use('/users', userRouter);
    this.app.use('/boards', boardRouter);
    boardRouter.use('/:boardId/tasks', taskRouter);

    this.app.use(mapDomainErrorToHttpResponse);

    this.server = this.app.listen(environment.PORT);

    return this.server;
  }
}
