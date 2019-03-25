import { Sequelize } from 'sequelize'
import { DB } from '../basic/config';

export const sequelize = new Sequelize({
  dialect : 'mysql',
  port    : DB.port,
  database: DB.database,
  username: DB.user,
  password: DB.password,
  pool    : {
    max: 20,
    idle: 30000
  },
})