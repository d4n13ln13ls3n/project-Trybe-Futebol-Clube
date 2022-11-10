/* eslint-disable class-methods-use-this */
import { User } from '../interfaces';
import BadRequest from '../errors/httpErrors/BadRequest';

type RequiredFields = ['email', 'username', 'role', 'password'];
export default class UserService {
  create(user: User): User {
    const requiredFields: RequiredFields = ['email', 'username', 'role', 'password'];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of requiredFields) {
      if (!user[field]) {
        throw new BadRequest(`${field} is required`);
      }
    }
    // const newUser = UserModel.create(user);
    // return newUser;
    return user;
  }
}
