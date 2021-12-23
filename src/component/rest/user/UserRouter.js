import { Router } from 'express';
import * as userController from './UserController';
import { controllerHandler } from '../../../middleware/ErrorHandler';
import { authMiddleware } from '../../../middleware/Auth';

const path = '/user';
const router = Router();

router.get('/all', authMiddleware, controllerHandler(userController.getAllUsersController));
router.get('/me', authMiddleware, controllerHandler(userController.getMeController));
router.get('/:id', authMiddleware, controllerHandler(userController.getUserByUserIdController));

export default { path, router };
