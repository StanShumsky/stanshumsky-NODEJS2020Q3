import { Task } from '@express-rest-service/domain/entities';
import { ITaskRepository } from '@express-rest-service/domain/interfaces';

export class TaskService {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async find(boardId: string): Promise<Task[]> {
    return this.taskRepository.findByBoard(boardId);
  }

  public async findOne(boardId: string, taskId: string): Promise<Task> {
    return this.taskRepository.findOneByBord(boardId, taskId);
  }

  public async create(boardId: string, body: Partial<Task>): Promise<Task> {
    const task = new Task({ ...body, boardId });
    return this.taskRepository.create(task);
  }

  public async update(boardId: string, taskId: string, body: Partial<Task>): Promise<Task> {
    const task = new Task({ ...body, id: taskId, boardId });
    await this.taskRepository.findOneByBord(boardId, taskId);
    return this.taskRepository.update(task);
  }

  public async delete(boardId: string, taskId: string): Promise<void> {
    await this.taskRepository.findOneByBord(boardId, taskId);
    await this.taskRepository.delete(taskId);
  }
}
