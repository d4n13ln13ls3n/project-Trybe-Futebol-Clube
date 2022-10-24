import 'dotenv/config';

export default {
  port: process.env.DB_PORT || 3002,
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_HOST || 'password',
  host: process.env.DB_HOST || 'backend',
};
