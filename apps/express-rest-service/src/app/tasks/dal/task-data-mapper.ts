import { Task } from '../task';
import { TaskEntity } from './task.entity';
import { IEntityDataMapper } from '@express-rest-service/shared';

export class TaskDataMapper implements IEntityDataMapper<Task, TaskEntity> {
  public toDomain(entity: TaskEntity): Task {
    return new Task(entity);
  }

  public toEntity(model: Task): TaskEntity {
    return { ...model };
  }
}
