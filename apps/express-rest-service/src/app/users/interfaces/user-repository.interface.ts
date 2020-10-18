import { IRepository } from '@express-rest-service/shared';
import { User } from '../user';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepository extends IRepository<User> {
  // Add custom methods here ...
}
