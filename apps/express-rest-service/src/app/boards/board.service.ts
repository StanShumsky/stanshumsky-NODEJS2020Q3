import { ITaskRepository } from '@express-rest-service/tasks';
import { Board } from './board';
import { IBoardRepository } from './interfaces/board-repository.interface';
import { IBoardService } from './interfaces/board-service.interface';

export class BoardService implements IBoardService {
  constructor(private boardRepository: IBoardRepository, private taskRepository: ITaskRepository) {}

  public async find(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  public async findOne(boardId: string): Promise<Board> {
    return this.boardRepository.findOne(boardId);
  }

  public async create(body: Partial<Board>): Promise<Board> {
    const board = new Board({ ...body });
    return this.boardRepository.create(board);
  }

  public async update(boardId: string, body: Partial<Board>): Promise<Board> {
    const board = new Board({ ...body, id: boardId });
    return this.boardRepository.update(boardId, board);
  }

  public async delete(boardId: string): Promise<void> {
    await Promise.all([this.boardRepository.delete(boardId), this.taskRepository.deleteTasksByBoard(boardId)]);
  }
}
