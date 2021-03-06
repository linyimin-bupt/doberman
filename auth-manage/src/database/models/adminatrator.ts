import { Model, DataTypes } from 'sequelize'
import { sequelize        } from '../data-access'

export interface AdminatratorObj {
  id?         : number,   // 管理员id
  isOnline?   : number,   // 是否在线
  username?   : string,   // 用户名
  password?   : string,   // 密码
  operator?   : string,   // 操作人员
  createAt?   : Date,     // 创建时间
  updateAt?   : Date,     // 更改时间
}
export class Adminatrator extends Model {
  id      : number  // 管理员id
  isOnline: number  // 是否在线
  username: string  // 用户名
  password: string  // 密码
  operator: string  // 操作人员
  createAt: Date    // 创建时间
  updateAt: Date    // 更改时间
}
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