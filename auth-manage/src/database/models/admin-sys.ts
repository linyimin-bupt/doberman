import { Model, DataTypes } from 'sequelize';
import { sequelize        } from '../data-access';

export interface AdminSysObj {
  adminId?  : number,   // 管理员id
  system_id?: number,   // 系统id
}

export class AdminSys extends Model {}

AdminSys.init({
  adminId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    field: 'admin_id',
  },
  systemId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    field: 'system_id',
  }
}, {
  sequelize: sequelize,
  tableName: 'admin_sys',
  timestamps: false,
})