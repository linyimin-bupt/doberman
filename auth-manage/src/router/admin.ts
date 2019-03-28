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
  // TODO: 使用session获取operator
  const data: AdminatratorObj = req.body
  const id = req.params.id
  
  const response: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    const result = await Adminatrator.findByPk(id)
    if (result && result.username === data.username) { 
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
adminRrouter.get('/systems', (req: Request, res: Response) => {
  
})

adminRrouter.get('/systems/:id', (req: Request, res: Response) => {
  
})

adminRrouter.post('/systems', (req: Request, res: Response) => {
  
})

adminRrouter.put('/systems/:id', (req: Request, res: Response) => {
  
})

adminRrouter.delete('/systems/:id', (req: Request, res: Response) => {
  
})

// 部门
adminRrouter.get('/departments', (req: Request, res: Response) => {
  
})

adminRrouter.get('/departments/:id', (req: Request, res: Response) => {
  
})

adminRrouter.put('/departments/:id', (req: Request, res: Response) => {
  
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