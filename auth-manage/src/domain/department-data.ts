import { UserData } from './user-data'

export class DepartmentData {
  public name         : string           // 部门名称
  public role         : string           // 角色名称
  public isOnline     : number           // 是否在线
  public operator     : string           // 操作人
  public departmentKey: string           // 部门标识符
  public description  : string           // 部门描述
  public createAt     : Date             // 创建时间
  public updateAt     : Date             // 更新时间
  public users        : Array<UserData>  // 部门成员
  public roles        : Array<RoleData>  // 角色
}