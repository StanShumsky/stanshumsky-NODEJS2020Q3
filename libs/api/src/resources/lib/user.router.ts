import { UserController } from '@express-rest-service/api/controllers';
import { taskRepository, userRepository } from '@express-rest-service/database-abstraction/repositories';
import { UserService } from '@express-rest-service/domain/services';
import { Router } from 'express';

const router = Router();
const userService = new UserService(userRepository, taskRepository);
const controller = new UserController(userService);

router.route('/').get(controller.find).post(controller.create);

router.route('/:id').get(controller.findOne).put(controller.update).delete(controller.delete);

export { router as userRouter };
