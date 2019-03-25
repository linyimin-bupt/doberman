import { Model, DataTypes } from 'sequelize'
import { sequelize        } from '../data-access'

export interface UserRoleObj {
  userId?: number  // 用户id
  roleId?: number  // 角色id
}

export class DepartmentRole extends Model {}

DepartmentRole.init({
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    field: 'user_id',
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.INTEGER.UNSIGNED,
    field: 'role_id',
    primaryKey: true,
  }
}, {
  sequelize: sequelize,
  timestamps: false,
  tableName: 'user_role'
})