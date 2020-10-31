import { EntityNotFoundError, GenericRepository, IEntityDataMapper } from '@express-rest-service/shared';
import { Collection } from 'mongoose';
import { UserDataMapper } from '../dal/user-data-mapper';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { User } from '../user';
import { IUserEntity, UserEntity } from './user.entity';

export class UserRepository extends GenericRepository<User, IUserEntity> implements IUserRepository {
  constructor(repository: Collection, dataMapper: IEntityDataMapper<User, IUserEntity>) {
    super(repository, dataMapper);
  }

  public async findUserByLogin(login: string): Promise<User> {
    const entity = await this.repository.findOne({ login });
    if (entity) {
      return this.dataMapper.toDomain(entity);
    }

    throw new EntityNotFoundError(this.repository.name, { login });
  }
}

export const userRepository = new UserRepository(UserEntity.collection, new UserDataMapper());
