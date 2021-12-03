import { User } from '.prisma/client'

import prisma from '../database/prisma'
import type { ICreateUserDto } from './user.dto'

async function create(data: ICreateUserDto): Promise<number> {
  const user = await prisma.user.create({ data })
  return user && user.id
}

async function findOne(userId: number): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  return user
}

export const UserService = {
  create,
  findOne
}

export type IUserService = typeof UserService
