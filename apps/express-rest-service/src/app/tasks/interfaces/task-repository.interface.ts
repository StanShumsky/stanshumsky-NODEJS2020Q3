import { IRepository } from '@express-rest-service/shared';
import { Task } from '../task';

export interface ITaskRepository extends IRepository<Task> {
  findTasks(boardId: string): Promise<Task[]>;
  findOneTask(boardId: string, taskId: string): Promise<Task>;
  updateTask(boardId: string, taskId: string, task: Task): Promise<Task>;
  deleteTask(boardId: string, taskId: string): Promise<boolean>;
  deleteTasksByBoard(boardId: string): Promise<boolean>;
  unassignUser(userId: string): Promise<boolean>;
}
