import { IRepository } from '@express-rest-service/shared';
import { User } from '../user';

export interface IUserRepository extends IRepository<User> {
  findUserByLogin(login: string): Promise<User>;
}
