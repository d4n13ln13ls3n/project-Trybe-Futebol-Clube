// import { AuthenticationCredentials } from 'src/interfaces';

// import { credentialsSchema } from './schemas';

// const validateUser = ({ email: string, password: string }: AuthenticationCredentials) => {
//   const { error } = credentialsSchema
//     .validate({ email, password });

//   if (error) {
//     return { type: 'INVALID_VALUE', message: error.message };
//   }

//   if (!email) {
//     return { type: 'REQUIRED_FIELD', message: error.message };
//   }

//   if (!password) {
//     return { type: 'REQUIRED_FIELD', message: error.message };
//   }

//   if (password.length < 6) {
//     return { type: 'UNPROCESSABLE_ENTITY', message: error.message };
//   }
// };
