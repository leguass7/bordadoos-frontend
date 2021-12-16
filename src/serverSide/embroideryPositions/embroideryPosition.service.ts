import { EmbroideryPosition, Prisma as PrismaTypes } from '.prisma/client'

import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { IEmbroideryPositionFilter } from './EmbroideryPosition.dto'

async function paginate(
  pagination: PaginationQueryDto,
  filter: IEmbroideryPositionFilter = {}
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

export const EmbroideryPositionService = {
  paginate
}

export type IEmbroideryPositionService = typeof EmbroideryPositionService
