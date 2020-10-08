import { TaskEntity } from '@express-rest-service/database-abstraction/entities';
import { IEntityDataMapper } from '@express-rest-service/database-abstraction/interfaces';
import { Task } from '@express-rest-service/domain/entities';

export class TaskDataMapper implements IEntityDataMapper<Task, TaskEntity> {
  public toDomain(entity: TaskEntity): Task {
    return new Task(entity);
  }

  public toEntity(model: Task): TaskEntity {
    return { ...model };
  }
}
