import { ITaskRepository } from './interfaces/task-repository.interface';
import { ITaskService } from './interfaces/task-service.interface';
import { Task } from './task';

export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) {}

  public async find(boardId: string): Promise<Task[]> {
    return this.taskRepository.findTasks(boardId);
  }

  public async findOne(boardId: string, taskId: string): Promise<Task> {
    return this.taskRepository.findOneTask(boardId, taskId);
  }

  public async create(boardId: string, body: Partial<Task>): Promise<Task> {
    const task = new Task({ ...body, boardId });
    return this.taskRepository.create(task);
  }

  public async update(boardId: string, taskId: string, body: Partial<Task>): Promise<Task> {
    const task = new Task({ ...body, id: taskId, boardId });
    return this.taskRepository.updateTask(boardId, taskId, task);
  }

  public async delete(boardId: string, taskId: string): Promise<void> {
    await this.taskRepository.deleteTask(boardId, taskId);
  }
}
