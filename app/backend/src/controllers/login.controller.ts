import { Request, Response } from 'express';
import { AuthenticationCredentials } from '../interfaces';
import LoginService from '../services/login.service';
// import UserModel from '../database/models/Users';
import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';

export default class AuthenticationController {
  // private loginService: LoginService;

  // constructor() {
  //   this.loginService = new LoginService();
  // }

  static login = async (req: Request, res: Response) => {
    const token = await LoginService.login(
      req.body as AuthenticationCredentials,
    );
    console.log('token:', token);
    if (!token) {
      throw new UnauthorizedHttpError('Invalid email or password');
    }

    return res.status(200).json({ token });
  };

  // static getRole = async (req: Request, res: Response) => {
  //   const { authorization } = req.headers;
  //   const { password } = LoginService.loginValidation(authorization);
  //   const { role } = await UserModel.findOne({ where: { password } });
  //   return res.status(200).json(role);
  // };
}
