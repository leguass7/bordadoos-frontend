import type { NextApiResponse } from 'next'

import type { IRequestCreateUserDto, IRequestUserDto, IResponseUserDto } from './user.dto'
import type { IUserService } from './user.service'

function create(userService: IUserService) {
  return async (req: IRequestCreateUserDto, res: NextApiResponse<IResponseUserDto>) => {
    const userId = await userService.create(req.body)
    return res.status(201).json({ success: true, userId })
  }
}

function findOne(userService: IUserService) {
  return async (req: IRequestUserDto, res: NextApiResponse<IResponseUserDto>) => {
    const { query } = req
    const userId = query?.userId ? parseInt(query?.userId) || 0 : 0
    const user = await userService.findOne(userId)
    return res.status(201).json({ success: true, user })
  }
}

export function factoryUserController(userService: IUserService) {
  return {
    create: create(userService),
    findOne: findOne(userService)
  }
}
