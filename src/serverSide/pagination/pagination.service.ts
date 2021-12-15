import { Prisma } from '.prisma/client'

import cammelcase from 'camelcase-keys'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from './pagination.dto'

interface Props extends PaginationQueryDto {
  model: Prisma.ModelName
  size?: number
  page?: number
  orderBy?: string
  order?: 'asc' | 'desc'
  include?: any
  where?: any
}

async function paginate<T = unknown>({
  model,
  size = 25,
  page = 1,
  orderBy,
  order,
  include,
  where
}: Props): Promise<PaginationDto<T>> {
  const aux: any = {}
  aux[model] = model

  const prismaModel = prisma[Object.keys(cammelcase(aux))[0]]
  const totalCount = await prismaModel.count({ where: { ...where } })

  if (!totalCount) return { total: 0, pages: 0, page, data: [] }

  let findManyArgs = {}
  if (where) findManyArgs = { ...findManyArgs, where: { ...where } }
  if (size) {
    const skip = size * (page - 1) || undefined
    // console.log('skip', skip);
    findManyArgs = { ...findManyArgs, take: size, skip }
  }
  if (orderBy) findManyArgs = { ...findManyArgs, orderBy: { [orderBy]: order } }

  if (include) findManyArgs = { ...findManyArgs, include: include }

  const pages = Math.ceil(totalCount / size)

  try {
    const results = await prismaModel.findMany({
      ...findManyArgs,
      take: size
    })
    return {
      total: totalCount,
      page,
      pages,
      data: results
    }
  } catch (error) {
    console.log(error)
    return {
      total: 0,
      page,
      pages,
      data: []
    }
  }
}

export const PrismaService = {
  paginate
}

export type IUserService = typeof PrismaService
