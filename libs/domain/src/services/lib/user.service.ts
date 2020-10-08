import { User } from '@express-rest-service/domain/entities';
import { ITaskRepository, IUserRepository } from '@express-rest-service/domain/interfaces';

export class UserService {
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

  public async update(id: string, body: Partial<User>): Promise<User> {
    const user = new User({ ...body, id });
    return this.userRepository.update(user);
  }

  public async delete(userId: string): Promise<void> {
    await Promise.all([this.userRepository.delete(userId), this.taskRepository.unassignUser(userId)]);
  }
}
