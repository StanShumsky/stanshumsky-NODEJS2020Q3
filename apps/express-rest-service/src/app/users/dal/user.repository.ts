import { GenericRepository, InMemoryRepository } from '@express-rest-service/shared';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { User } from '../user';
import { UserDataMapper } from './user-data-mapper';
import { UserEntity } from './user.entity';

export class UserRepository extends GenericRepository<User, UserEntity> implements IUserRepository {
  constructor() {
    super(new InMemoryRepository<UserEntity>('User'), new UserDataMapper());
  }
}

export const userRepository = new UserRepository();
