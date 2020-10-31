import { Router } from 'express';
import { userService } from '../user.service';
import { UserController } from './user.controller';

const router = Router();
const controller = new UserController(userService);

router.route('/').get(controller.find).post(controller.create);
router.route('/:id').get(controller.findOne).put(controller.update).delete(controller.delete);

export { router as userRouter };
