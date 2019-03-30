import { 
  Router,
  Request,
  Response, 
                          } from 'express'
import {
  Adminatrator, AdminatratorObj,
                          } from '../database/models/adminatrator'
import { ResponseFormat   } from '../util/response-format'
import { LOGGER           } from '../util/logger'
import { AdminSys         } from '../database/models/admin-sys'
import { 
  System, 
  SystemObj,
                          } from '../database/models/system'
import * as uuid            from 'uuid4'
import { Department, DepartmentObj } from '../database/models/department';
import { Role } from '../database/models/role';
import { DepartmentRole } from '../database/models/user-role';

export const adminRrouter: Router = Router()

/**
 * 获取所有管理员信息
 */
adminRrouter.get('/administrators', async (req: Request, res: Response) => {
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null
  } 
  try {
    result.data = (await Adminatrator.findAll()).map(administrator => {
      administrator.password = ''
      return administrator
    })
  } catch (e) {
    result.code = 1
    result.message = 'Not found'
    LOGGER.error('/administrators error: %j', e)
  }
  res.json(result)
})

/**
 * 获取某个管理员的信息
 */
adminRrouter.get('/administrators/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    result.data = await Adminatrator.findByPk(id)
  } catch (e) {
    result.code = 1
    result.message = 'Not found'
    LOGGER.error(`get /administrators:${id} error: %j`, e)
  }
  res.json(result)
})
/**
 * 添加一个管理员
 */
adminRrouter.post('/administrators', async (req: Request, res: Response) => {
  const data: AdminatratorObj = req.body
  data.operator = req.session && req.session.user.username
  const response: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    const result = await Adminatrator.findOne({ where: { username: data.username || '' } })
    if (result) {
      response.code    = 1
      response.message = `管理员${data.username}已经存在`
    } else {
      await Adminatrator.create(data)
    }
  } catch (e) {
    response.code = 1
    response.message = 'Not found'
    LOGGER.error(`post /administrators error: %j`, e)
  }
  res.json(response)
})
/**
 * 修改管理员信息
 */
adminRrouter.put('/administrators/:id', async (req: Request, res: Response) => {
  const data: AdminatratorObj = req.body
  const id = req.params.id
  
  const response: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    const result = await Adminatrator.findOne({where: { username: data.username || '' }})
    if (result && result.username === data.username && result.id != id) { 
      response.code    = 1
      response.message = `管理员${data.username}已经存在`
    } else {
      data.updateAt = new Date()
      await Adminatrator.update(data, { where: { id: id } })
    }
  } catch (e) {
    response.code = 1
    response.message = 'Not found'
    LOGGER.error(`put /administrators error: %j`, e)
  }
  res.json(response)
})
/**
 * 删除一个管理员
 */
adminRrouter.delete('/administrators/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    await Adminatrator.destroy({where: {id: id}, cascade: true})
  } catch (e) {
    result.code = 1
    result.message = 'delete error'
    LOGGER.error(`delete /administrators:${id} error: %s`, JSON.stringify(e, null, 2))
  }
  res.json(result)
})


// 系统
adminRrouter.get('/systems', async (req: Request, res: Response) => {
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  if (req.session && req.session.user) {
    try {
      const adminId   = req.session.user.userId
      const username  = req.session.user.username
      let systemIds: Array<number>
      if (username === 'admin') {
        systemIds = (await AdminSys.findAll()).map(adminSys => adminSys.systemId)        
      } else {
        systemIds = (await AdminSys.findAll({ where: {adminId: adminId} })).map(adminSys => adminSys.systemId)
      }
      const systems   = await System.findAll({ where: {id: systemIds}})
      result.data = systems.map(system => {
        return {
          id      : system.id,
          name    : system.name,
          index   : system.webIndex,
          operator: system.operator,
          createAt: system.createAt,
          updateAt: system.updateAt,
        }
      })
    } catch (e) {
      result.code = 1
      result.message = 'find system error'
      LOGGER.error(`get /systems error: %s`, JSON.stringify(e, null, 2))
    }
  } else {
    // TODO: 填写前端对应的登录地址
    res.redirect('/login')
  }
  res.json(result)
})

adminRrouter.get('/systems/:id', async (req: Request, res: Response) => {
  const systemId = req.params.id
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    const system = await System.findByPk(systemId)
    if (system) {
      system.token = ''
      result.data = system
    } else {
      result.code = 1
      result.message = `system ${systemId} is not found`
      LOGGER.error(`system ${systemId} is not found`)      
    }
  } catch (e) {
    result.code = 1
    result.message = 'find system error'
    LOGGER.error(`get /systems:${systemId} error: %s`, JSON.stringify(e, null, 2))
  }
  res.json(result)
})

adminRrouter.post('/systems', async (req: Request, res: Response) => {
  const data: SystemObj = req.body
  const response: ResponseFormat = {
    code: 0,
    message: '',
    data: null,
  }
  data.appKey   = uuid()
  data.secret   = uuid()
  data.operator = (req.session && req.session.user.username) || ''
  const adminId = req.session && req.session.user.userId
  LOGGER.info(req.session!.user)
  try {
    const result = await System.findOne({where: {name: data.name || ''}})
    if (!result) {
      const insertResult = await System.create(data)
      await AdminSys.create({adminId: adminId, systemId: insertResult.id})
    } else {
      response.code = 1
      response.message = `系统名${data.name}已经存在`
    }
  } catch (e) {
    response.code = 1
    response.message = `添加系统失败`
    LOGGER.error(`post /systems error: %s`, JSON.stringify(e, null, 2))
  }
  res.json(response)
})

adminRrouter.put('/systems/:id', async (req: Request, res: Response) => {
  const systemId        = req.params.id
  const data: SystemObj = req.body
  const response: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    const result = await System.findOne({where: {name: data.name || ''}})
    if (result && systemId != result.id && result.name === data.name) { 
      response.code    = 1
      response.message = `系统${data.name}已经存在`
    } else {
      data.updateAt = new Date()
      await System.update(data, { where: { id: systemId } })
    }
  } catch (e) {
    response.code = 1
    response.message = 'Not found'
    LOGGER.error(`put /systems:${systemId} error: %j`, e)
  }
  res.json(response)
})

adminRrouter.delete('/systems/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    await System.destroy({where: {id: id}, cascade: true})
  } catch (e) {
    result.code = 1
    result.message = 'delete error'
    LOGGER.error(`delete /systems:${id} error: %s`, JSON.stringify(e, null, 2))
  }
  res.json(result)
})

// 部门 
adminRrouter.get('/departments', async (req: Request, res: Response) => {
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  if (req.session && req.session.user) {
    try {
      const adminId   = req.session.user.userId
      const username  = req.session.user.username
      let systemIds: Array<number>
      if (username === 'admin') {
        systemIds = (await AdminSys.findAll()).map(adminSys => adminSys.systemId)        
      } else {
        systemIds = (await AdminSys.findAll({ where: {adminId: adminId} })).map(adminSys => adminSys.systemId)
      }
      const departments = await Department.findAll({ where: {systemId: systemIds}})
      result.data       = departments.map(async department => {
        const system = await System.findByPk(department.systemId)
        return {
          id           : department.id,
          name         : department.name,
          descrition   : department.description,
          departmentKey: department.departmentKey,
          operator     : department.operator,
          createAt     : department.createAt,
          updateAt     : department.updateAt,
          systemId     : department.systemId,
          systemName   : system!.name,
        }
      })
    } catch (e) {
      result.code = 1
      result.message = 'find system error'
      LOGGER.error(`get /aprtments error: %s`, JSON.stringify(e, null, 2))
    }
  } else {
    // TODO: 填写前端对应的登录地址
    res.redirect('/login')
  }
  res.json(result)
})

adminRrouter.get('/departments/:id', async (req: Request, res: Response) => {
  const departmentId = req.params.id
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    const department  = await Department.findByPk(departmentId)
    if (department) {
      const system      = await System.findByPk(department.systemId)
      const departments = (await Department.findAll({where: {systemId: department.systemId}})).filter(temp => department.id != temp.id)
      const roleIds     = (await DepartmentRole.findAll({where: {departmentId: department.id}})).map(departmentRole => departmentRole.roleId)
      const roles       = await Role.findAll({where: {id: roleIds}})
      result.data = {
        department : department,    // 本部门信息
        roles      : roles,         // 角色信息
        systemName : system!.name,  // 系统名称
        departments: departments,   // 所属部门信息
      }
    } else {
      result.code = 1
      result.message = `departemnt ${departmentId} is not found`
      LOGGER.error(`departemnt ${departmentId} is not found`)      
    }
  } catch (e) {
    result.code = 1
    result.message = 'find system error'
    LOGGER.error(`get /department:${departmentId} error: %s`, JSON.stringify(e, null, 2))
  }
  res.json(result)
})

adminRrouter.put('/departments/:id', async (req: Request, res: Response) => {
  const data: DepartmentObj = req.body
  const departmentId        = req.params.id
  const response: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    data.updateAt = new Date()
    await Department.update(data, { where: { id: departmentId } })
    if (data.roleId != null || data.roleId != undefined) {
      await DepartmentRole.update({roleId: data.roleId})
    }
  } catch (e) {
    response.code = 1
    response.message = 'Not found'
    LOGGER.error(`put /systems:${departmentId} error: %j`, e)
  }
  res.json(response)
  
})

adminRrouter.post('/departments', (req: Request, res: Response) => {
  
})

adminRrouter.delete('/departments/:id', (req: Request, res: Response) => {
  
})

// 角色
adminRrouter.get('/roles', (req: Request, res: Response) => {
  
})

adminRrouter.get('/roles/:id', (req: Request, res: Response) => {
  
})

adminRrouter.put('/roles/:id', (req: Request, res: Response) => {
  
})

adminRrouter.post('/roles', (req: Request, res: Response) => {
  
})

adminRrouter.delete('/roles/:id', (req: Request, res: Response) => {
  
})

// 用户
adminRrouter.get('/users', (req: Request, res: Response) => {
  
})

adminRrouter.get('/users/:id', (req: Request, res: Response) => {
  
})

adminRrouter.put('/users/:id', (req: Request, res: Response) => {
  
})

adminRrouter.post('/users', (req: Request, res: Response) => {
  
})

adminRrouter.delete('/users/:id', (req: Request, res: Response) => {
  
})