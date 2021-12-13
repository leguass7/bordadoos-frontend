import { Embroiderytype, Prisma as PrismaTypes } from '.prisma/client'

import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { IEmbroiderytypeFilter } from './embroideryType.dto'

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

export const EmbroideryTypeService = {
  paginate
}

export type IEmbroideryTypeService = typeof EmbroideryTypeService
