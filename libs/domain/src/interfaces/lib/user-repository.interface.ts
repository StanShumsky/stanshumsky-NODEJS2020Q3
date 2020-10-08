import { User } from '@express-rest-service/domain/entities';
import { IRepository } from './repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepository extends IRepository<User> {
  // Add custom methods here ...
}
