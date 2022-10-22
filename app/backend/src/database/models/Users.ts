import { Model, DataTypes } from 'sequelize';
// eslint-disable-next-line import/no-cycle
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  role: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  password: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
