import { Request, Response  } from 'express'
import { ResponseFormat     } from '../util/response-format'
import { Adminatrator } from '../database/models/adminatrator';
import { LOGGER } from '../util/logger';
export const restrict = function (req: Request, res: Response, next: Function) {
  if (req.session && req.session.user) {
    next()
  } else {
    // TODO: 改为真实的前端首页地址
    res.redirect('/login')
  }
}

export const login = async function (req: Request, res: Response) {
  const {
    username,
    password,
  } = req.body
  const result: ResponseFormat = {
    code   : 0,
    message: '',
    data   : null,
  }
  try {
    const user = await Adminatrator.findOne({ where: {username: username}})
    if (!user || user.password !== password) {
      result.code = 1
      result.message = '用户名或密码不正确' 
    } else if (user.isOnline === 0){
      result.code = 1
      result.message = '用户已经注销' 
    } else {
      req.session!.user = {
        userId  : user.id,
        username: user.username,
      }
      result.data = req.session!.user
    }
  } catch(e) {
    result.code = 1
    result.message = 'login error'
    LOGGER.error(`post /login error: %s`, JSON.stringify(e, null, 2))
  }
  res.json(result)
}

export const logout = function (req: Request, res: Response) {
  if (req.session && req.session.user) {
    req.session.user = null
  }
  // TODO: 改为真实的前端首页地址
  res.redirect('/login')
}