import type { NextApiRequest, NextApiResponse } from 'next'

import ErrorApi from '../ErrorApi'
import { PaginationQueryDto } from '../pagination/pagination.dto'
import type {
  IRequestCreateUserDto,
  IRequestUpdateUserDto,
  IRequestUserDto,
  IResponsePaginateUserDto,
  IResponseUserDto
} from './user.dto'
import type { IUserService } from './user.service'

function create(userService: IUserService) {
  return async (req: IRequestCreateUserDto, res: NextApiResponse<IResponseUserDto>) => {
    const userId = await userService.create(req.body)
    return res.status(201).json({ success: true, userId })
  }
}

function update(userService: IUserService) {
  return async (req: IRequestUpdateUserDto, res: NextApiResponse) => {
    const { query, body } = req
    const { userId } = req.auth

    const id = query?.userId ? parseInt(query?.userId) || 0 : 0
    if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

    await userService.update(id, body)
    return res.status(201).json({ success: true })
  }
}

function findOne(userService: IUserService) {
  return async (req: IRequestUserDto, res: NextApiResponse<IResponseUserDto>) => {
    const { userId } = req.query
    const user = await userService.findOne(userId)
    return res.status(200).json({ success: true, user })
  }
}

function paginate(userService: IUserService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponsePaginateUserDto>) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await userService.paginate(paginateData, filter)
    return res.status(200).json({ success: true, data, ...pagination })
  }
}

function remove(userService: IUserService) {
  return async (req: IRequestUserDto, res: NextApiResponse<IResponseUserDto>) => {
    const { query } = req

    const userId = query?.userId ? parseInt(`${query.userId || 0}`) || 0 : 0
    const success = await userService.deleteUser(userId)

    return res.status(202).json({ success, userId })
  }
}

export function factoryUserController(userService: IUserService) {
  return {
    create: create(userService),
    findOne: findOne(userService),
    paginate: paginate(userService),
    update: update(userService),
    remove: remove(userService)
  }
}
