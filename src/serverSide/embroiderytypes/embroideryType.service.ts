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

async function searchOne(embTypeData: Partial<Embroiderytype>) {
  const search = Object.entries(embTypeData).map<Partial<Embroiderytype>>(([key, value]) => {
    const obj = {}
    obj[key] = value
    return obj
  })

  const embType = await prisma.embroiderytype.findFirst({ where: { OR: search } })
  return embType
}

async function create(embTypeData: IEmbTypeDTO) {
  const embType = await prisma.embroiderytype.create({ data: embTypeData })
  return embType
}

async function update(embTypeId: number, data: Partial<Embroiderytype>): Promise<number> {
  const emb = await prisma.embroiderytype.update({ data, where: { id: embTypeId } })
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
