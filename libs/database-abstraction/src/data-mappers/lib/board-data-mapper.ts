import { BoardEntity } from '@express-rest-service/database-abstraction/entities';
import { IEntityDataMapper } from '@express-rest-service/database-abstraction/interfaces';
import { Board } from '@express-rest-service/domain/entities';

export class BoardDataMapper implements IEntityDataMapper<Board, BoardEntity> {
  public toDomain(entity: BoardEntity): Board {
    return new Board(entity);
  }

  public toEntity(model: Board): BoardEntity {
    return { ...model };
  }
}
