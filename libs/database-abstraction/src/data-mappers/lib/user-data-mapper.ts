import { IEntityDataMapper } from '@express-rest-service/database-abstraction/interfaces';
import { User } from '@express-rest-service/domain/entities';
import { UserEntity } from '@express-rest-service/database-abstraction/entities';

export class UserDataMapper implements IEntityDataMapper<User, UserEntity> {
  public toDomain(entity: UserEntity): User {
    return new User(entity);
  }

  public toEntity(model: User): UserEntity {
    return { ...model };
  }
}
