import { IEntityDataMapper } from '@express-rest-service/shared';
import { User } from '../user';
import { UserEntity } from './user.entity';

export class UserDataMapper implements IEntityDataMapper<User, UserEntity> {
  public toDomain(entity: UserEntity): User {
    return new User(entity);
  }

  public toEntity(model: User): UserEntity {
    return { ...model };
  }
}
