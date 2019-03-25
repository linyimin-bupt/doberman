import { Model, DataTypes } from 'sequelize'
import { sequelize        } from '../data-access'

export interface User {
  id      : number  // 用户id
  username: string  // 用户名
  password: string  // 密码
  isOnline: string  // 是否在线
  operator: string  // 操作人
  systemId: number  // 系统id
  createAt: Date    // 创建时间
  updateAt: Date    // 更新时间
}

export class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
  },
  updateAt: {
    type     : DataTypes.DATE,
    allowNull: false,
    field    : 'update_at',
  },
  systemId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'system_id',
  },
  isOnline: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'is_online',
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operator: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize: sequelize,
  timestamps: false,
  tableName: 'user',
})

User.addHook('beforeCreate', (user: any) => {
  user.createAt = new Date()
  user.updateAt = user.createAt
})