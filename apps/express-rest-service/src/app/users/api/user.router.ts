import { taskRepository } from '@express-rest-service/tasks';
import { Router } from 'express';
import { userRepository } from '../dal/user.repository';
import { UserService } from '../user.service';
import { UserController } from './user.controller';

const router = Router();
const userService = new UserService(userRepository, taskRepository);
const controller = new UserController(userService);

router.route('/').get(controller.find).post(controller.create);
router.route('/:id').get(controller.findOne).put(controller.update).delete(controller.delete);

export { router as userRouter };
