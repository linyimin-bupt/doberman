import { Model, DataTypes } from 'sequelize/types'
import { sequelize } from '../data-access'

export interface DepartmentObj {
  id?           : number,   // 部门ID
  createAt?     : Date,     // 创建时间
  updateAt?     : Date,     // 更改时间
  description?  : string,   // 部门描述
  isOnline?     : number,   // 是否在线
  departmentKey?: number,   // 部门唯一标识
  name?         : string,   // 部门名称
  operator?     : string,   // 操作人
  parentId?     : number,   // 上级部门id
  systemId?     : number,   // 所属系统id
}

export class Department extends Model {}

Department.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  }
}, {
  sequelize: sequelize
})