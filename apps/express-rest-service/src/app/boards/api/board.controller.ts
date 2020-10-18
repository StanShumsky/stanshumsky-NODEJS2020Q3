import { asyncHandler } from '@express-rest-service/utils';
import { Request, Response } from 'express';
import { Board } from '../board';
import { IBoardService } from '../interfaces/board-service.interface';

export class BoardController {
  private boardService: IBoardService;

  constructor(boardService: IBoardService) {
    this.boardService = boardService;
  }

  @asyncHandler()
  public async find(req: Request, res: Response): Promise<void> {
    const boards = await this.boardService.find();
    res.json(boards.map(Board.toResponse));
  }

  @asyncHandler()
  public async findOne(req: Request, res: Response): Promise<void> {
    const board = await this.boardService.findOne(req.params.id);
    res.json(Board.toResponse(board));
  }

  @asyncHandler()
  public async create(req: Request, res: Response): Promise<void> {
    const board = await this.boardService.create(req.body);
    res.json(Board.toResponse(board));
  }

  @asyncHandler()
  public async update(req: Request, res: Response): Promise<void> {
    const board = await this.boardService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  }

  @asyncHandler()
  public async delete(req: Request, res: Response): Promise<void> {
    await this.boardService.delete(req.params.id);
    res.sendStatus(200);
  }
}
