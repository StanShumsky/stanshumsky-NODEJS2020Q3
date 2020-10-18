import { GenericRepository, InMemoryRepository } from '@express-rest-service/shared';
import { Board } from '../board';
import { IBoardRepository } from '../interfaces/board-repository.interface';
import { BoardDataMapper } from './board-data-mapper';
import { BoardEntity } from './board.entity';

export class BoardRepository extends GenericRepository<Board, BoardEntity> implements IBoardRepository {
  constructor() {
    super(new InMemoryRepository<BoardEntity>('Board'), new BoardDataMapper());
  }
}

export const boardRepository = new BoardRepository();
