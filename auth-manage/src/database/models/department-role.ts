import { Model, DataTypes } from 'sequelize'
import { sequelize        } from '../data-access'

export  interface DepartMentRoleObj {
  roleId?      : number  // 角色id
  departmentId?: number  // 部分id
}

export class DepartmentRole extends Model {}

DepartmentRole.init({
  roleId: {
    type: DataTypes.INTEGER.UNSIGNED,
    field: 'role_id',
    primaryKey: true,
  },
  departmentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    field: 'department_id',
    primaryKey: true,
  }
}, {
  sequelize: sequelize,
  timestamps: false,
  tableName: 'department_role'
})