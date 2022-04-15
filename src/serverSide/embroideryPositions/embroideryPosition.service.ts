import { EmbroideryPosition, Prisma as PrismaTypes } from '.prisma/client'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { IEmbPosDTO, IEmbPosFilter } from './EmbroideryPosition.dto'

async function paginate(
  pagination: PaginationQueryDto,
  filter: IEmbPosFilter = {}
): Promise<PaginationDto<EmbroideryPosition>> {
  const { search, actived } = filter
  const where: PrismaTypes.EmbroideryPositionWhereInput = { id: { not: 0 }, actived }

  if (search)
    where.AND = {
      OR: [{ label: { contains: `${search}` } }, { description: { contains: `${search}` } }]
    }

  const embTypes = await PrismaService.paginate<EmbroideryPosition>({
    model: 'EmbroideryPosition',
    ...pagination,
    where
  })
  return embTypes
}

async function findOne(embPosData: Partial<EmbroideryPosition>) {
  const embPos = await prisma.embroideryPosition.findFirst({ where: embPosData })
  return embPos
}

async function create(embPosData: IEmbPosDTO) {
  const embPos = await prisma.embroideryPosition.create({ data: embPosData })
  return embPos
}

async function update(embPosId: number, data: Partial<EmbroideryPosition>): Promise<number> {
  const emb = await prisma.embroideryPosition.update({ data, where: { id: embPosId } })
  return emb && emb.id
}

async function search(filter: IEmbPosFilter = {}): Promise<EmbroideryPosition[]> {
  const { search, typeId } = filter
  const where: PrismaTypes.EmbroideryPositionWhereInput = { id: { not: 0 }, actived: true }

  if (search)
    where.AND = {
      OR: [{ label: { contains: `${search}` } }, { description: { contains: `${search}` } }]
    }

  if (typeId) where.AND = { ...where.AND, embType: typeId }

  const embroideryPositions = await prisma.embroideryPosition.findMany({ take: 10, where, orderBy: { label: 'asc' } })
  return embroideryPositions
}

export const EmbroideryPositionService = {
  paginate,
  findOne,
  create,
  update,
  search
}

export type IEmbroideryPositionService = typeof EmbroideryPositionService
