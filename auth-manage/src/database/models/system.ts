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