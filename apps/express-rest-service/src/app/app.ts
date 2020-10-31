import { authMiddleware, authRouter } from '@express-rest-service/auth';
import { boardRouter } from '@express-rest-service/boards';
import { environment } from '@express-rest-service/environment';
import { ILogger, loggerMiddleware } from '@express-rest-service/shared';
import { taskRouter } from '@express-rest-service/tasks';
import { userRouter, userService } from '@express-rest-service/users';
import { mapDomainErrorToHttpResponse } from '@express-rest-service/utils';
import * as express from 'express';
import { connect as mongooseConnect, Connection, connection as mongooseConnection, Mongoose } from 'mongoose';
import { Server } from 'net';
import { join } from 'path';
import * as swagger from 'swagger-ui-express';
import * as yaml from 'yamljs';

export class App {
  private app = express();
  private server: Server;
  private mongoose: Mongoose;

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

    this.app.use('/login', authRouter);

    this.app.use(authMiddleware);

    this.app.use('/users', userRouter);
    this.app.use('/boards', boardRouter);
    boardRouter.use('/:boardId/tasks', taskRouter);

    this.app.use(mapDomainErrorToHttpResponse);

    this.server = this.app.listen(environment.PORT);

    return this.server;
  }

  public async connect(connectionString: string): Promise<Connection> {
    if (this.mongoose) {
      return this.mongoose.connection;
    }

    mongooseConnection.on('connected', () => {
      this.logger.info('mongodb running at:', connectionString);
    });
    mongooseConnection.on('open', async () => {
      await userService.createFixtureAdmin();
    });
    mongooseConnection.on('error', (error: Error) => {
      this.logger.info('mongodb error', error);
      process.exit(1);
    });
    mongooseConnection.on('disconnected', () => {
      this.logger.info('mongodb disconnected!');
    });
    mongooseConnection.on('reconnected', () => {
      this.logger.info('mongodb has reconnected!');
    });

    this.mongoose = await mongooseConnect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    process.on('SIGINT', () => {
      mongooseConnection.close(() => {
        this.logger.info('mongodb disconnected through app termination!');
        process.exit(0);
      });
    });

    return this.mongoose.connection;
  }
}
