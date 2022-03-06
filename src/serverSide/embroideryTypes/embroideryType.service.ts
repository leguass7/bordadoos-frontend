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

async function create(embTypeData: IEmbTypeDTO) {
  const embType = await prisma.embroideryType.create({ data: embTypeData })
  return embType
}

async function update(embTypeId: number, data: Partial<EmbroideryType>): Promise<number> {
  const emb = await prisma.embroideryType.update({ data, where: { id: embTypeId } })
  return emb && emb.id
}

async function search(filter: IEmbroideryTypeFilter = {}): Promise<EmbroideryType[]> {
  const { search } = filter
  const where: PrismaTypes.EmbroideryTypeWhereInput = { id: { not: 0 }, actived: true }

  if (search)
    where.AND = {
      OR: [{ label: { contains: `${search}` } }, { description: { contains: `${search}` } }]
    }

  const embroideryTypes = await prisma.embroideryType.findMany({ take: 10, where, orderBy: { label: 'asc' } })
  return embroideryTypes
}

export const EmbroideryTypeService = {
  paginate,
  findOne,
  create,
  update,
  search
}

export type IEmbroideryTypeService = typeof EmbroideryTypeService
