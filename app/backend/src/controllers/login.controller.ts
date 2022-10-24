import { Request, Response } from 'express';
import { AuthenticationCredentials } from '../interfaces';
import LoginService from '../services/login.service';

export default class AuthenticationController {
  // private loginService: LoginService;

  // constructor() {
  //   this.loginService = new LoginService();
  // }

  static login = async (req: Request, res: Response) => {
    const token = await LoginService.login(
      req.body as AuthenticationCredentials,
    );

    if (!token) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    return res.status(200).json({ token });
  };
}
