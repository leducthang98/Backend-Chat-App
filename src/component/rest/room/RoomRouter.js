import { Router } from 'express';
import * as roomController from '../room/RoomController';
import { controllerHandler } from '../../../middleware/ErrorHandler';
import { authMiddleware } from '../../../middleware/Auth';

const path = '/room';
const router = Router();

router.post('/create', authMiddleware, controllerHandler(roomController.createRoomController));
router.get('/me', authMiddleware, controllerHandler(roomController.getMyRoomsController));
router.get('/:id/chat-data', authMiddleware, controllerHandler(roomController.getChatDataInRoomController));

export default { path, router };
