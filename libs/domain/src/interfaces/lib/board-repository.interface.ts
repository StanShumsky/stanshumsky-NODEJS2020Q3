import { Board } from '@express-rest-service/domain/entities';
import { IRepository } from './repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBoardRepository extends IRepository<Board> {
  // Add custom methods here ...
}
