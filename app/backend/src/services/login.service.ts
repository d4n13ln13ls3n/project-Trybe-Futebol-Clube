import * as jwt from 'jsonwebtoken';
import env from '../config/env';

import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';
import { AuthenticationCredentials, User, JWTPayload } from '../interfaces';
import UserModel from '../database/models/Users';
import TokenAuth from '../utils/auth';

export default class LoginService {
  private userModel: UserModel;

  // constructor() {
  //   this.userModel = new UserModel(connection);
  // }

  static createAccessToken(user: User) {
    // const userToAuthenticate = await this.userModel.getByUsername(user.username);
    // console.log('userToAuthenticate:', userToAuthenticate);
    const { email, id } = user;
    const token = jwt.sign({ email, id }, env.jwtSecret, { expiresIn: '1w' });
    // console.log('token inside login service:', token);
    // console.log('email:', email);
    // console.log('user:', user);
    return token;
  }

  static async login({ email, password }: AuthenticationCredentials) {
    const user = await UserModel.findOne({ where: { email }, raw: true }); // revisar
    console.log('user:', user);

    if (user === null) {
      return null;
    }

    const validPassword = TokenAuth.compare(password, user.password);
    if (!validPassword) {
      return null;
    }
    const token = LoginService.createAccessToken(user);
    return token;
  }

  static validateAccessToken(token: string) {
    // const token = req.header('Authorization');
    // const token = this.createAccessToken(user);

    if (!token) {
      throw new UnauthorizedHttpError('INVALID_FIELDS');
    }

    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      // console.log('decoded token:', decoded);
      return decoded as JWTPayload;
    } catch (err) {
      throw new UnauthorizedHttpError('INVALID_FIELDS');
    }
  }
}
