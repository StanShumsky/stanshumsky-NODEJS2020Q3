import { IUserEntity } from './dal/user.entity';

export class User {
  readonly id: IUserEntity['_id'];
  readonly name: IUserEntity['name'];
  readonly login: IUserEntity['login'];
  readonly password: IUserEntity['password'];

  constructor({ id = undefined, name = '', login = '', password = '' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
