import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create(req: Request, res: Response): Response {
    const error = this.userService.create(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    return res.sendStatus(201);
  }
}
