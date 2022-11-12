/* eslint-disable class-methods-use-this */
import { User } from '../interfaces';
import BadRequest from '../errors/httpErrors/BadRequest';
import UserModel from '../database/models/Users';

type RequiredFields = ['email', 'username', 'role', 'password'];
export default class UserService {
  async create(user: User): Promise<User> {
    const requiredFields: RequiredFields = ['email', 'username', 'role', 'password'];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of requiredFields) {
      if (!user[field]) {
        throw new BadRequest(`${field} is required`);
      }
    }
    const newUser = await UserModel.create(user);
    return newUser;
  }
}
