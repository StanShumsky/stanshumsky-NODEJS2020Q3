import { boardRouter, taskRouter, userRouter } from '@express-rest-service/api/resources';
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

  constructor() {
    this.app.use(express.json());

    process.on('unhandledRejection', (reason: string) => console.error('Error:', reason));
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

    this.app.use('/users', userRouter);
    this.app.use('/boards', boardRouter);
    boardRouter.use('/:boardId/tasks', taskRouter);

    this.app.use(mapDomainErrorToHttpResponse);

    this.server = this.app.listen(environment.PORT);

    return this.server;
  }
}
