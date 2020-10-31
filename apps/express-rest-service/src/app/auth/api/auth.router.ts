import { Router } from 'express';
import { userRepository } from '../../users/dal/user.repository';
import { AuthService } from '../auth.service';
import { AuthController } from './auth.controller';

const router = Router();
const controller = new AuthController(new AuthService(userRepository));

router.route('/').post(controller.login);

export { router as authRouter };
