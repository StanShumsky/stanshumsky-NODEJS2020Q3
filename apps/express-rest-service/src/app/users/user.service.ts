import { ITaskRepository } from '@express-rest-service/tasks';
import { IUserRepository } from './interfaces/user-repository.interface';
import { IUserService } from './interfaces/user-service.interface';
import { User } from './user';

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private taskRepository: ITaskRepository;

  constructor(userRepository: IUserRepository, taskRepository: ITaskRepository) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  public async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  public async create(body: Partial<User>): Promise<User> {
    const user = new User({ ...body });
    return this.userRepository.create(user);
  }

  public async update(userId: string, body: Partial<User>): Promise<User> {
    const user = new User({ ...body, id: userId });
    return this.userRepository.update(user);
  }

  public async delete(userId: string): Promise<void> {
    await Promise.all([this.userRepository.delete(userId), this.taskRepository.unassignUser(userId)]);
  }
}
