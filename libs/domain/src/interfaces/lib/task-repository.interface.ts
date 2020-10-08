import { Task } from '@express-rest-service/domain/entities';
import { IRepository } from './repository.interface';

export interface ITaskRepository extends IRepository<Task> {
  findByBoard(boardId: string): Promise<Task[]>;
  findByUser(userId: string): Promise<Task[]>;
  deleteByBoard(boardId: string): Promise<boolean>;
  unassignUser(userId: string): Promise<boolean>;
  findOneByBord(boardId: string, taskId: string): Promise<Task>;
}
