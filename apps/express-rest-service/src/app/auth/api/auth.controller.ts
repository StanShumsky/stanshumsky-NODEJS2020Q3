import { asyncHandler } from '@express-rest-service/utils';
import { Request, Response } from 'express';
import { IAuthService } from '../auth.service.interface';

export class AuthController {
  constructor(private authService: IAuthService) {}

  @asyncHandler()
  public async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;
    const token = await this.authService.login(login, password);
    res.json({ token });
  }
}
