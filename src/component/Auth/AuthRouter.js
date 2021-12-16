import { Router } from 'express';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { loginController, signUpController } from './AuthController';

const path = '/auth';
const router = Router();

router.post('/sign-up', controllerHandler(signUpController));
router.post('/login', controllerHandler(loginController));

export default { path, router };
