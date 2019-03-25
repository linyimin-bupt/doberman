# doberman
统一权限管理系统，对外提供同意的权限管理系统，同时支持多语言客户端

## 数据库ER图设计

![ER图](./auth-manage/docs/images/ER.png)

**关系模式**

1. 系统管理员(adminarator): <font color="#dd0000">管理员id</font>, 用户名
2. 系统(system): <font color="#dd0000">系统id</font>, 系统信息
3. 部门(apartment): <font color="#dd0000">部门id</font>, <font color="#0000dd">系统id</font>, 部门其他信息
4. 角色(role): <font color="#dd0000">角色id</font>, 角色其他信息
5. 用户(user): <font color="#dd0000">用户id</font>, 用户其他信息
6. 系统管理员-系统(admin-sys): <font color="#0000dd">管理员id, 系统id</font>
7. 部门-角色(apartment-role): <font color="#0000dd">部门id, 角色id</font>
8. 用户-角色(user-role): <font color="#0000dd">用户id, 角色id</font>

其中, 红色字段为表的主键, 蓝色为表的外键