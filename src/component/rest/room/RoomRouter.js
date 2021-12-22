import { Router } from 'express';
import * as roomController from '../room/RoomController';
import { controllerHandler } from '../../../middleware/ErrorHandler';
import { authMiddleware } from '../../../middleware/Auth';

const path = '/room';
const router = Router();

router.post('/create', authMiddleware, controllerHandler(roomController.createRoomController));
router.get('/all', authMiddleware, controllerHandler(roomController.getAllRoomsController));

export default { path, router };
