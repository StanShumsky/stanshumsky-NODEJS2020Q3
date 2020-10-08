import { UserDataMapper } from '@express-rest-service/database-abstraction/data-mappers';
import { UserEntity } from '@express-rest-service/database-abstraction/entities';
import { User } from '@express-rest-service/domain/entities';
import { IUserRepository } from '@express-rest-service/domain/interfaces';
import { GenericRepository } from './generic.repository';
import { InMemoryRepository } from './in-memory.repository';

export class UserRepository extends GenericRepository<User, UserEntity> implements IUserRepository {
  constructor() {
    super(new InMemoryRepository<UserEntity>('User'), new UserDataMapper());
  }
}

export const userRepository = new UserRepository();
