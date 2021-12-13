import { Embroiderytype, Prisma as PrismaTypes } from '.prisma/client'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { IEmbroiderytypeFilter, IEmbTypeDTO } from './embroideryType.dto'

async function paginate(
  pagination: PaginationQueryDto,
  filter: IEmbroiderytypeFilter = {}
): Promise<PaginationDto<Embroiderytype>> {
  const { search, actived } = filter
  const where: PrismaTypes.EmbroiderytypeWhereInput = { id: { not: 0 }, actived }

  if (search)
    where.AND = {
      OR: [{ label: { contains: `${search}` } }, { description: { contains: `${search}` } }]
    }

  const embTypes = await PrismaService.paginate<Embroiderytype>({
    model: 'Embroiderytype',
    ...pagination,
    where
  })
  return embTypes
}

async function findOne(embTypeData: Partial<Embroiderytype>) {
  const embType = await prisma.embroiderytype.findFirst({ where: embTypeData })
  return embType
}

async function create(embTypeData: IEmbTypeDTO) {
  const embType = await prisma.embroiderytype.create({ data: embTypeData })
  return embType
}

export const EmbroideryTypeService = {
  paginate,
  findOne,
  create
}

export type IEmbroideryTypeService = typeof EmbroideryTypeService
