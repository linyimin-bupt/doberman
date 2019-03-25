import { Model, DataTypes, UpdateOptions } from 'sequelize'
import { sequelize } from '../data-access'

export interface AdminatratorObj {
  id?      : number,
  isOnline?: number,
  username?: string,
  password?: string,
  operator?: string,
  createAt?: Date,
  updateAt?: Date,
}
export class Adminatrator extends Model {}
Adminatrator.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  isOnline: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'is_online',  
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false, 
  },
  operator: {
    type: DataTypes.STRING(255),
    allowNull: false, 
  },
  createAt: {
    type: DataTypes.DATE,
    field: 'create_at'
  },
  updateAt: {
    type: DataTypes.DATE,
    field: 'update_at'
  },
}, { 
  tableName: 'adminatrator',
  sequelize: sequelize,
  timestamps: false,
})


Adminatrator.addHook('beforeCreate', (adminatrator: any) => {
  adminatrator.createAt = new Date()
  adminatrator.updateAt = adminatrator.createAt
})