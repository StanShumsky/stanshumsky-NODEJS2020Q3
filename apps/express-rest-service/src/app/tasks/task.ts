import { ITaskEntity } from './dal/task.entity';

export class Task {
  readonly id: ITaskEntity['_id'];
  readonly title: ITaskEntity['title'];
  readonly order: ITaskEntity['order'];
  readonly description: ITaskEntity['description'];
  readonly userId: ITaskEntity['userId'];
  readonly boardId: ITaskEntity['boardId'];
  readonly columnId: ITaskEntity['columnId'];

  constructor({
    id = undefined,
    title = '',
    order = 0,
    description = '',
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: Task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
