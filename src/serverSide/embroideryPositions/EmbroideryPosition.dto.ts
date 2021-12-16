import { EmbroideryPosition } from '@prisma/client'

import { IResponseApi } from '../api.interface'
import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import { PaginationQueryDto } from '../pagination/pagination.dto'

export interface IEmbroideryPositionFilter {
  search?: string
  actived?: boolean
}

export type IPaginateEmbroideryPositionDTO = PaginationQueryDto & IEmbroideryPositionFilter
export interface IEmbPosDTO extends Omit<Partial<EmbroideryPosition>, 'id'> {
  label: string
  description: string
  createdBy: number
  updatedBy: number
}

// Requests
export interface IRequestPaginateEmbroideryPositionDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPaginateEmbroideryPositionDTO
}

// Responses
export interface IResponsePaginateEmbroideryPositionDto extends IResponseApi {
  data: EmbroideryPosition[]
}
