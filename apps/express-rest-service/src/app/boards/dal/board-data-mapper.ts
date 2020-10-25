import { IEntityDataMapper } from '@express-rest-service/shared';
import { Board } from '../board';
import { BoardEntity, IBoardEntity } from './board.entity';

export class BoardDataMapper implements IEntityDataMapper<Board, IBoardEntity> {
  public toDomain(entity: IBoardEntity): Board {
    return new Board({ id: entity._id, ...entity });
  }

  public toEntity(board: Board): IBoardEntity {
    return BoardEntity.hydrate({ _id: board.id, ...board });
  }
}
