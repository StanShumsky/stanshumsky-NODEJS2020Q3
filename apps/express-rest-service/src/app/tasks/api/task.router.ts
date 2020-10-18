import { Router } from 'express';
import { taskRepository } from '../dal/task.repository';
import { TaskService } from '../task.service';
import { TaskController } from './task.controller';

const router = Router({ mergeParams: true });
const taskService = new TaskService(taskRepository);
const controller = new TaskController(taskService);

router.route('/').get(controller.find).post(controller.create);
router.route('/:id').get(controller.findOne).put(controller.update).delete(controller.delete);

export { router as taskRouter };
