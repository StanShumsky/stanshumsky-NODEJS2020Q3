import { BoardController } from '@express-rest-service/api/controllers';
import { boardRepository, taskRepository } from '@express-rest-service/database-abstraction/repositories';
import { BoardService } from '@express-rest-service/domain/services';
import { Router } from 'express';

const router = Router({ mergeParams: true });
const boardService = new BoardService(boardRepository, taskRepository);
const controller = new BoardController(boardService);

router.route('/').get(controller.find).post(controller.create);

router.route('/:id').get(controller.findOne).put(controller.update).delete(controller.delete);

export { router as boardRouter };
