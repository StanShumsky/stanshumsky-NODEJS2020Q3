import { Board } from '../board';

export interface IBoardService {
  find(): Promise<Board[]>;
  findOne(boardId: string): Promise<Board>;
  create(body: Partial<Board>): Promise<Board>;
  update(id: string, body: Partial<Board>): Promise<Board>;
  delete(boardId: string): Promise<void>;
}
