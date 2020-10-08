import { TaskController } from '@express-rest-service/api/controllers';
import { taskRepository } from '@express-rest-service/database-abstraction/repositories';
import { TaskService } from '@express-rest-service/domain/services';
import { Router } from 'express';

const router = Router({ mergeParams: true });
const taskService = new TaskService(taskRepository);
const controller = new TaskController(taskService);

router.route('/').get(controller.find).post(controller.create);

router.route('/:id').get(controller.findOne).put(controller.update).delete(controller.delete);

export { router as taskRouter };
