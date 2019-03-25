import { Model, DataTypes } from 'sequelize'
import { sequelize        } from '../data-access'

export interface RoleObj {
  id?         : number  // 角色id
  createAt?   : Date    // 创建时间
  updateAt?   : Date    // 更新时间
  description?: string  // 角色描述
  isOnline?   : number  // 是否在线
  name?       : string  // 角色名称
  operator?   : string  // 操作人
  systemId?   : number  // 系统id
}

export class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  createAt: {
    type: DataTypes.DATE,
    field: 'create_at',
    allowNull: false,
  },
  updateAt: {
    type: DataTypes.DATE,
    field: 'updateAt_at',
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isOnline: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'is_online',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operator: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  systemId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'system_id',
  }
}, {
  sequelize: sequelize,
  timestamps: false,
  tableName: 'role',
})

Role.addHook('beforeCreate', (role: any) => {
  role.createAt = new Date()
  role.updateAt = role.createAt
})