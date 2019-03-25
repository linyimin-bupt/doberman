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

