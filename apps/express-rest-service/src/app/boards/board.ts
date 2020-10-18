export class Board {
  readonly id: string;
  readonly title: string;
  readonly columns: { id: string; title: string; order: number }[];

  constructor({ id = null, title = '', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
