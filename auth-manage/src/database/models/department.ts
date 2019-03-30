import { Model, DataTypes } from 'sequelize/types'
import { sequelize        } from '../data-access'

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
  roleId?       : number,    // 所属角色
}

export class Department extends Model {
  public id           : number  // 部门ID
  public createAt     : Date    // 创建时间
  public updateAt     : Date    // 更改时间
  public description  : string  // 部门描述
  public isOnline     : number  // 是否在线
  public departmentKey: number  // 部门唯一标识
  public name         : string  // 部门名称
  public operator     : string  // 操作人
  public parentId     : number  // 上级部门id
  public systemId     : number  // 所属系统id
  public roleIdl      : number  // 所属角色
}

Department.init({
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
  departmentKey: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'department_key',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operator: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'parent_id',
  },
  systemId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'system_id',
  },
}, {
  sequelize: sequelize,
  timestamps: false,
  tableName: 'department',
})

Department.addHook('beforeCreate', (department: any) => {
  department.createAt = new Date()
  department.updateAt = department.createAt
})