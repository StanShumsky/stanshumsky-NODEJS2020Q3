import { taskRepository } from '@express-rest-service/tasks';
import { Router } from 'express';
import { BoardService } from '../board.service';
import { boardRepository } from '../dal/board.repository';
import { BoardController } from './board.controller';

const router = Router({ mergeParams: true });
const boardService = new BoardService(boardRepository, taskRepository);
const controller = new BoardController(boardService);

router.route('/').get(controller.find).post(controller.create);
router.route('/:id').get(controller.findOne).put(controller.update).delete(controller.delete);

export { router as boardRouter };
