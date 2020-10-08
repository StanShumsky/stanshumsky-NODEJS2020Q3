import { Board } from '@express-rest-service/domain/entities';
import { IBoardRepository, ITaskRepository } from '@express-rest-service/domain/interfaces';

export class BoardService {
  private boardRepository: IBoardRepository;
  private taskRepository: ITaskRepository;

  constructor(boardRepository: IBoardRepository, taskRepository: ITaskRepository) {
    this.boardRepository = boardRepository;
    this.taskRepository = taskRepository;
  }

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

  public async update(id: string, body: Partial<Board>): Promise<Board> {
    const board = new Board({ ...body, id });
    return this.boardRepository.update(board);
  }

  public async delete(boardId: string): Promise<void> {
    await Promise.all([this.boardRepository.delete(boardId), this.taskRepository.deleteByBoard(boardId)]);
  }
}
