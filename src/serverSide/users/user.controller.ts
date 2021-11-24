import type { NextApiResponse } from 'next'

import type { IRequestCreateUserDto, IResponseUserDto } from './user.dto'
import type { IUserService } from './user.service'

function create(userService: IUserService) {
  return async (req: IRequestCreateUserDto, res: NextApiResponse<IResponseUserDto>) => {
    const userId = await userService.create(req.body)
    return res.status(201).json({ success: true, userId })
  }
}

export function factoryUserController(userService: IUserService) {
  return {
    create: create(userService)
  }
}
