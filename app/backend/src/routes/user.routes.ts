import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();
const router = Router();

router
  .post('/users', (req, res) => userController.create(req, res));

export default router;
