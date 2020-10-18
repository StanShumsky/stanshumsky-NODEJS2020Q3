import { User } from '../user';

export interface IUserService {
  find(): Promise<User[]>;
  findOne(userId: string): Promise<User>;
  create(body: Partial<User>): Promise<User>;
  update(userId: string, body: Partial<User>): Promise<User>;
  delete(userId: string): Promise<void>;
}
