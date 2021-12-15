import { EmbroideryType, Prisma as PrismaTypes } from '.prisma/client'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { IEmbroideryTypeFilter, IEmbTypeDTO } from './embroideryType.dto'

async function paginate(
  pagination: PaginationQueryDto,
  filter: IEmbroideryTypeFilter = {}
): Promise<PaginationDto<EmbroideryType>> {
  const { search, actived } = filter
  const where: PrismaTypes.EmbroideryTypeWhereInput = { id: { not: 0 }, actived }

  if (search)
    where.AND = {
      OR: [{ label: { contains: `${search}` } }, { description: { contains: `${search}` } }]
    }

  const embTypes = await PrismaService.paginate<EmbroideryType>({
    model: 'EmbroideryType',
    ...pagination,
    where
  })
  return embTypes
}

async function findOne(embTypeData: Partial<EmbroideryType>) {
  const embType = await prisma.embroideryType.findFirst({ where: embTypeData })
  return embType
}

async function searchOne(embTypeData: Partial<EmbroideryType>) {
  const search = Object.entries(embTypeData).map<Partial<EmbroideryType>>(([key, value]) => {
    const obj = {}
    obj[key] = value
    return obj
  })

  const embType = await prisma.embroideryType.findFirst({ where: { OR: search } })
  return embType
}

async function create(embTypeData: IEmbTypeDTO) {
  const embType = await prisma.embroideryType.create({ data: embTypeData })
  return embType
}

async function update(embTypeId: number, data: Partial<EmbroideryType>): Promise<number> {
  const emb = await prisma.embroideryType.update({ data, where: { id: embTypeId } })
  return emb && emb.id
}

export const EmbroideryTypeService = {
  paginate,
  findOne,
  searchOne,
  create,
  update
}

export type IEmbroideryTypeService = typeof EmbroideryTypeService
