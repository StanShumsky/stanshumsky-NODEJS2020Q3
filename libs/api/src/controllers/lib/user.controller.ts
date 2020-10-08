import { User } from '@express-rest-service/domain/entities';
import { UserService } from '@express-rest-service/domain/services';
import { asyncHandler } from '@express-rest-service/utils';
import { Request, Response } from 'express';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @asyncHandler()
  public async find(req: Request, res: Response): Promise<void> {
    const users = await this.userService.find();
    res.json(users.map(User.toResponse));
  }

  @asyncHandler()
  public async findOne(req: Request, res: Response): Promise<void> {
    const user = await this.userService.findOne(req.params.id);
    res.json(User.toResponse(user));
  }

  @asyncHandler()
  public async create(req: Request, res: Response): Promise<void> {
    const user = await this.userService.create(req.body);
    res.json(User.toResponse(user));
  }

  @asyncHandler()
  public async update(req: Request, res: Response): Promise<void> {
    const user = await this.userService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  }

  @asyncHandler()
  public async delete(req: Request, res: Response): Promise<void> {
    await this.userService.delete(req.params.id);
    res.sendStatus(200);
  }
}
