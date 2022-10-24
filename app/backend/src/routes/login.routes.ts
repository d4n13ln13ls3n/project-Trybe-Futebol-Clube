import { Router } from 'express';

import AuthenticationController from '../controllers/login.controller';

import loginMiddleware from '../middlewares/login.middleware';

const router = Router();

// const controller = new AuthenticationController();

router.post('/', loginMiddleware, AuthenticationController.login);

export default router;
