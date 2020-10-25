import { EntityNotFoundError, GenericRepository, IEntityDataMapper } from '@express-rest-service/shared';
import { Collection, Types } from 'mongoose';
import { ITaskRepository } from '../interfaces/task-repository.interface';
import { Task } from '../task';
import { TaskDataMapper } from './task-data-mapper';
import { ITaskEntity, TaskEntity } from './task.entity';
const { ObjectId } = Types;

export class TaskRepository extends GenericRepository<Task, ITaskEntity> implements ITaskRepository {
  constructor(repository: Collection, dataMapper: IEntityDataMapper<Task, ITaskEntity>) {
    super(repository, dataMapper);
  }

  public async findTasks(boardId: string): Promise<Task[]> {
    const entities = await this.repository.find({ boardId: new ObjectId(boardId) }).toArray();
    return entities.map((entity) => this.dataMapper.toDomain(entity));
  }

  public async findOneTask(boardId: string, taskId: string): Promise<Task> {
    const entity = await this.repository.findOne({
      _id: new ObjectId(taskId),
      boardId: new ObjectId(boardId),
    });
    if (entity) {
      return this.dataMapper.toDomain(entity);
    }
    throw new EntityNotFoundError(this.repository.name, { taskId, boardId });
  }

  public async updateTask(boardId: string, taskId: string, task: Task): Promise<Task> {
    const entity = this.dataMapper.toEntity(task);
    await this.repository.replaceOne(
      {
        boardId: new ObjectId(boardId),
        _id: new ObjectId(taskId),
      },
      entity.toObject()
    );
    if (entity) {
      return this.dataMapper.toDomain(entity.toObject());
    }
    throw new EntityNotFoundError(this.repository.name, { taskId, boardId });
  }

  public async deleteTask(boardId: string, taskId: string): Promise<boolean> {
    const { result } = await this.repository.deleteOne({
      boardId: new ObjectId(boardId),
      _id: new ObjectId(taskId),
    });
    return result.ok > 0;
  }

  public async deleteTasksByBoard(boardId: string): Promise<boolean> {
    const { result } = await this.repository.deleteMany({
      boardId: new ObjectId(boardId),
    });
    return result.ok > 0;
  }

  public async unassignUser(userId: string): Promise<boolean> {
    const { result } = await this.repository.updateMany({ userId: new ObjectId(userId) }, { $set: { userId: null } });
    return result.ok > 0;
  }
}

export const taskRepository = new TaskRepository(TaskEntity.collection, new TaskDataMapper());
