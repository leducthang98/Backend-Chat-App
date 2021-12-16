import { Router } from 'express';
import { controllerHandler } from '../../middleware/ErrorHandler';
import { loginController, signUpController } from './AuthController';

const path = '/auth';
const router = Router();

router.get('/sign-up', controllerHandler(signUpController));
router.get('/login', controllerHandler(loginController));

export default { path, router };
