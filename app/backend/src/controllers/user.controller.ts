import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create(req: Request, res: Response): Response {
    const user = this.userService.create(req.body);

    return res.status(201).json(user);
  }
}
