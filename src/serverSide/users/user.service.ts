import prisma from '../database/prisma'
import type { ICreateUserDto } from './user.dto'

async function create(data: ICreateUserDto): Promise<number> {
  const user = await prisma.user.create({ data })
  return user && user.id
}

export const UserService = {
  create
}

export type IUserService = typeof UserService
