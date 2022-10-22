import { Request, Response } from 'express';
import { AuthenticationCredentials } from '../interfaces';
import LoginService from '../services/login.service';

export default class AuthenticationController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.loginService.login(
      { username, password } as AuthenticationCredentials,
    );

    return res.status(200).send({ token });
  };
}
