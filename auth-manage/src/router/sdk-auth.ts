import { Router, Request, Response } from 'express'

export const authRouter = Router()

// 获取系统token
authRouter.get('/tokens/:id', (req: Request, res: Response) => {
  
})

// 认证
authRouter.post('/authentications/:id', (req: Request, res: Response) => {
  
})

