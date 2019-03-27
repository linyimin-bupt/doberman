import { DepartmentData } from './department-data'

export class SystemData {
  public name       : string                 // 系统名称
  public decription : string                 // 描述
  public isOnline   : number                 // 是否在线
  public operator   : string                 // 操作人
  public createAt   : Date                   // 创建日期
  public updateAt   : Date                   // 更改时间
  public departments: Array<DepartmentData>  // 部门数据
}