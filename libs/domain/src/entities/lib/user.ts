export class User {
  readonly id: string;
  readonly name: string;
  readonly login: string;
  readonly password: string;

  constructor({ id = null, name = '', login = '', password = '' } = {}) {
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
