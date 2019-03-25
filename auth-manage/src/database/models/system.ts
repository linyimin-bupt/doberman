import { Model, DataTypes } from 'sequelize/types'
import { sequelize        } from '../data-access'
export interface SystemObj {
  id?         : number  // 系统id
  appKey?     : string  // 系统appkey
  secret?     : string  // 系统密钥
  description?: string  // 系统描述
  isOnline?   : number  // 是否在线
  name?       : string  // 系统名称
  operator?   : string  // 操作人
  token?      : string  // 系统token
  webIndex?   : string  // 系统首页
  createAt?   : Date    // 创建时间
  updateAt?   : Date    // 更新时间
}



export class System extends Model {}

System.init({
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isOnline: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'is_online',
  },
  appKey: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'app_key',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operator: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  secret: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'secret',
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  webIndex: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'web_index',
  },
}, {
  sequelize: sequelize,
  timestamps: false,
  tableName: 'system',
})

System.addHook('beforeCreate', (system: any) => {
  system.createAt = new Date()
  system.updateAt = system.createAt
})