import { GenericRepository, InMemoryRepository, EntityNotFoundError } from '@express-rest-service/shared';
import { ITaskRepository } from '../interfaces/task-repository.interface';
import { Task } from '../task';
import { TaskDataMapper } from './task-data-mapper';
import { TaskEntity } from './task.entity';

export class TaskRepository extends GenericRepository<Task, TaskEntity> implements ITaskRepository {
  constructor() {
    super(new InMemoryRepository<TaskEntity>('Task'), new TaskDataMapper());
  }

  public async findByBoard(boardId: string): Promise<Task[]> {
    const tasks = await this.repository.find();
    const entities = tasks.filter((task) => task.boardId === boardId);
    return entities.map((entity) => this.dataMapper.toDomain(entity));
  }

  public async findByUser(userId: string): Promise<Task[]> {
    const tasks = await this.repository.find();
    const entities = tasks.filter((task) => task.userId === userId);
    return entities.map((entity) => this.dataMapper.toDomain(entity));
  }

  public async findOneByBord(boardId: string, taskId: string): Promise<Task> {
    const entity = await this.repository.findOne(taskId);
    if (entity.boardId === boardId) {
      return this.dataMapper.toDomain(entity);
    }
    throw new EntityNotFoundError('Task', { taskId, boardId });
  }

  public async deleteByBoard(boardId: string): Promise<boolean> {
    const entities = await this.findByBoard(boardId);
    await Promise.all(entities.map((entity) => this.repository.delete(entity.id)));
    return entities.length > 0;
  }

  public async unassignUser(userId: string): Promise<boolean> {
    const entities = await this.findByUser(userId);
    await Promise.all(entities.map((entity) => this.repository.update({ ...entity, userId: null })));
    return entities.length > 0;
  }
}

export const taskRepository = new TaskRepository();
