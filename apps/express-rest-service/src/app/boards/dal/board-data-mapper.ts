import { IEntityDataMapper } from '@express-rest-service/shared';
import { Board } from '../board';
import { BoardEntity } from './board.entity';

export class BoardDataMapper implements IEntityDataMapper<Board, BoardEntity> {
  public toDomain(entity: BoardEntity): Board {
    return new Board(entity);
  }

  public toEntity(model: Board): BoardEntity {
    return { ...model };
  }
}
