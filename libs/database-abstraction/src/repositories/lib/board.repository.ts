import { BoardDataMapper } from '@express-rest-service/database-abstraction/data-mappers';
import { BoardEntity } from '@express-rest-service/database-abstraction/entities';
import { Board } from '@express-rest-service/domain/entities';
import { IBoardRepository } from '@express-rest-service/domain/interfaces';
import { GenericRepository } from './generic.repository';
import { InMemoryRepository } from './in-memory.repository';

export class BoardRepository extends GenericRepository<Board, BoardEntity> implements IBoardRepository {
  constructor() {
    super(new InMemoryRepository<BoardEntity>('Board'), new BoardDataMapper());
  }
}

export const boardRepository = new BoardRepository();
