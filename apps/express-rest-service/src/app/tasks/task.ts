export class Task {
  readonly id: string;
  readonly title: string;
  readonly order: number;
  readonly description: string;
  readonly userId: string;
  readonly boardId: string;
  readonly columnId: string;

  constructor({ id = null, title = '', order = 0, description = '', userId = '', boardId = '', columnId = '' } = {}) {
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
