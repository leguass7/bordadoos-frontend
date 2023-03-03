import { User, Prisma as PrismaTypes } from '.prisma/client'

import { removeInvalidValues } from '~/helpers/object'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { ICreateUserDto, IUserFilter, UserForPurchase } from './user.dto'

async function create(data: ICreateUserDto): Promise<number> {
  const user = await prisma.user.create({ data })
  return user && user.id
}

async function update(userId: number, data: Partial<User>): Promise<number> {
  const user = await prisma.user.update({ data, where: { id: userId } })
  return user && user.id
}

async function findOne(userData: Partial<User>): Promise<User> {
  const where: PrismaTypes.UserWhereInput = removeInvalidValues({ ...userData })

  const user = await prisma.user.findFirst({ where })
  return user
}

async function findOneFromPurchase(userData: Partial<User>): Promise<UserForPurchase> {
  const where: PrismaTypes.UserWhereInput = removeInvalidValues({ ...userData })

  const user = await prisma.user.findFirst({
    where,
    select: { name: true, _count: { select: { createdPurchases: true } } }
  })
  return user as UserForPurchase
}

async function paginate(pagination: PaginationQueryDto, filter: IUserFilter = {}): Promise<PaginationDto<User>> {
  const { search, actived } = filter
  const where: PrismaTypes.UserWhereInput = { id: { not: 0 }, actived }

  if (search)
    where.AND = {
      OR: [
        { name: { contains: `${search}` } },
        { cellPhone: { contains: `${search}` } },
        { email: { contains: `${search}` } }
      ]
    }

  const users = await PrismaService.paginate<User>({
    model: 'User',
    ...pagination,
    where
  })
  return users
}

async function deleteUser(userId: number, force = false): Promise<boolean> {
  try {
    const where: PrismaTypes.UserWhereInput & PrismaTypes.UserWhereUniqueInput = { id: userId }

    if (force) await prisma.user.delete({ where })
    else await prisma.user.update({ data: { actived: false }, where })

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const UserService = {
  create,
  update,
  findOne,
  paginate,
  deleteUser,
  findOneFromPurchase
}

export type IUserService = typeof UserService
