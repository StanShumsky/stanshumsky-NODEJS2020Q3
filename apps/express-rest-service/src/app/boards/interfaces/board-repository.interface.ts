import { IRepository } from '@express-rest-service/shared';
import { Board } from '../board';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBoardRepository extends IRepository<Board> {
  // Add custom methods here ...
}
