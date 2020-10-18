import { asyncHandler } from '@express-rest-service/utils';
import { Request, Response } from 'express';
import { ITaskService } from '../interfaces/task-service.interface';
import { Task } from '../task';

export class TaskController {
  private taskService: ITaskService;

  constructor(taskService: ITaskService) {
    this.taskService = taskService;
  }

  @asyncHandler()
  public async find(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskService.find(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  }

  @asyncHandler()
  public async findOne(req: Request, res: Response): Promise<void> {
    const task = await this.taskService.findOne(req.params.boardId, req.params.id);
    res.json(Task.toResponse(task));
  }

  @asyncHandler()
  public async create(req: Request, res: Response): Promise<void> {
    const task = await this.taskService.create(req.params.boardId, req.body);
    res.json(Task.toResponse(task));
  }

  @asyncHandler()
  public async update(req: Request, res: Response): Promise<void> {
    const task = await this.taskService.update(req.params.boardId, req.params.id, req.body);
    res.json(Task.toResponse(task));
  }

  @asyncHandler()
  public async delete(req: Request, res: Response): Promise<void> {
    await this.taskService.delete(req.params.boardId, req.params.id);
    res.sendStatus(200);
  }
}
