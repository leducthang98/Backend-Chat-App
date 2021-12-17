import { Router } from 'express';
import * as userController from './UserController';
import { controllerHandler } from '../../../middleware/ErrorHandler';
import { authMiddleware } from '../../../middleware/Auth';

const path = '/user';
const router = Router();

router.get('/all', authMiddleware, controllerHandler(userController.getAllUsersController));

export default { path, router };
