import { IEntityDataMapper } from '@express-rest-service/shared';
import { Task } from '../task';
import { ITaskEntity, TaskEntity } from './task.entity';

export class TaskDataMapper implements IEntityDataMapper<Task, ITaskEntity> {
  public toDomain(entity: ITaskEntity): Task {
    return new Task({ id: entity._id, ...entity });
  }

  public toEntity(task: Task): ITaskEntity {
    return TaskEntity.hydrate({ _id: task.id, ...task });
  }
}
