import { IEntityDataMapper } from '@express-rest-service/shared';
import { IUserEntity, UserEntity } from '../dal/user.entity';
import { User } from '../user';

export class UserDataMapper implements IEntityDataMapper<User, IUserEntity> {
  public toDomain(entity: IUserEntity): User {
    return new User({ id: entity._id, ...entity });
  }

  public toEntity(user: User): IUserEntity {
    return UserEntity.hydrate({ _id: user.id, ...user });
  }
}
