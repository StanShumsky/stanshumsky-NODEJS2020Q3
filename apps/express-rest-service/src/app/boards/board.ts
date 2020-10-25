import { IBoardEntity } from './dal/board.entity';

export class Board {
  readonly id: IBoardEntity['_id'];
  readonly title: IBoardEntity['title'];
  readonly columns: { id: string; title: string; order: number }[];

  constructor({ id = undefined, title = '', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
