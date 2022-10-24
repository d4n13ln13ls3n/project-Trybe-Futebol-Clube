// import * as Bcrypt from 'bcryptjs';
// import { AuthenticationCredentials } from '../interfaces';

// const encrypt = (credentials: AuthenticationCredentials) => {
//   const { password } = credentials;
//   const salt = Bcrypt.genSaltSync(10);
//   const hash = Bcrypt.hashSync(password, salt);
//   return hash;
// };

// const decrypt = (credentials: AuthenticationCredentials) => {
//   const { password } = credentials;
//   const decrypted = Bcrypt.hashSync(password);
//   return decrypted;
// };

// const compare = (credentials: AuthenticationCredentials) => {
//   const { password } = credentials;
//   const decrypted = decrypt(credentials);
//   return Bcrypt.compareSync(decrypted, password);
// };

// export {
//   encrypt,
//   decrypt,
//   compare,
// };

import { sign, Secret, verify, JwtPayload } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import Users from '../database/models/Users';

export default class TokenAuth {
  static compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  static encrypt(user: Users): string {
    const secret = process.env.JWT_SECRET as Secret;
    const token = sign({ data: user }, secret);

    return token;
  }

  static decrypt(token: string) {
    const secret = process.env.JWT_SECRET as Secret;
    const decrypted = verify(token, secret);

    return decrypted as JwtPayload;
  }
}
