import { Sequelize } from 'sequelize';
import * as config from '../config/database';
// import Users from './Users';
// import Matches from './Matches';
// import Teams from './Teams';

export default new Sequelize(config);
// export {
//   Users,
//   Matches,
//   Teams,
// };