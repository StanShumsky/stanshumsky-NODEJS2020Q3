import { TaskDataMapper } from '@express-rest-service/database-abstraction/data-mappers';
import { TaskEntity } from '@express-rest-service/database-abstraction/entities';
import { EntityNotFoundError, Task } from '@express-rest-service/domain/entities';
import { ITaskRepository } from '@express-rest-service/domain/interfaces';
import { GenericRepository } from './generic.repository';
import { InMemoryRepository } from './in-memory.repository';

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
