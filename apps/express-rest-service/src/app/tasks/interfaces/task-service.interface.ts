import { Task } from '../task';

export interface ITaskService {
  find(boardId: string): Promise<Task[]>;
  findOne(boardId: string, taskId: string): Promise<Task>;
  create(boardId: string, body: Partial<Task>): Promise<Task>;
  update(boardId: string, taskId: string, body: Partial<Task>): Promise<Task>;
  delete(boardId: string, taskId: string): Promise<void>;
}
