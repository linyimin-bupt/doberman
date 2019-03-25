export interface User {
  id      : number  // y用户id
  username: string  // 用户名
  password: string  // 密码
  isOnline: string  // 是否在线
  operator: string  // 操作人
  systemId: number  // 系统id
  createAt: Date    // 创建时间
  updateAt: Date    // 更新时间
}