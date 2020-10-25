import { GenericRepository, IEntityDataMapper } from '@express-rest-service/shared';
import { Collection } from 'mongoose';
import { Board } from '../board';
import { IBoardRepository } from '../interfaces/board-repository.interface';
import { BoardDataMapper } from './board-data-mapper';
import { BoardEntity, IBoardEntity } from './board.entity';

export class BoardRepository extends GenericRepository<Board, IBoardEntity> implements IBoardRepository {
  constructor(repository: Collection, dataMapper: IEntityDataMapper<Board, IBoardEntity>) {
    super(repository, dataMapper);
  }
}

export const boardRepository = new BoardRepository(BoardEntity.collection, new BoardDataMapper());
