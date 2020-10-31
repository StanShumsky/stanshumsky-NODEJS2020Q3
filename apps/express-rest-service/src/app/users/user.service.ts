import { ITaskRepository, taskRepository } from '@express-rest-service/tasks';
import { encryptPassword } from '@express-rest-service/utils';
import { userRepository } from './dal/user.repository';
import { IUserRepository } from './interfaces/user-repository.interface';
import { IUserService } from './interfaces/user-service.interface';
import { User } from './user';

class UserService implements IUserService {
  constructor(private userRepository: IUserRepository, private taskRepository: ITaskRepository) {}

  public async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  public async create(body: Partial<User>): Promise<User> {
    const hashedPassword = await encryptPassword(body.password);
    const user = new User({ ...body, password: hashedPassword });
    return this.userRepository.create(user);
  }

  public async update(userId: string, body: Partial<User>): Promise<User> {
    const hashedPassword = await encryptPassword(body.password);
    const user = new User({ ...body, id: userId, password: hashedPassword });
    return this.userRepository.update(userId, user);
  }

  public async delete(userId: string): Promise<void> {
    await Promise.all([this.userRepository.delete(userId), this.taskRepository.unassignUser(userId)]);
  }

  public async createFixtureAdmin(): Promise<void> {
    try {
      await this.userRepository.findUserByLogin('admin');
    } catch {
      const hashedPassword = await encryptPassword('admin');
      const user = new User({
        name: 'admin',
        login: 'admin',
        password: hashedPassword,
      });

      await this.userRepository.create(user);
    }
  }
}

export const userService = new UserService(userRepository, taskRepository);
