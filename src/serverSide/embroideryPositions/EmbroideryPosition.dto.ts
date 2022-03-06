import { EmbroideryPosition } from '@prisma/client'

import { IResponseApi } from '../api.interface'
import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import { PaginationQueryDto } from '../pagination/pagination.dto'

export interface IEmbPosFilter {
  search?: string
  actived?: boolean
}

export type IPaginateEmbPosDTO = PaginationQueryDto & IEmbPosFilter
export interface IEmbPosDTO extends Omit<Partial<EmbroideryPosition>, 'id'> {
  label: string
  createdBy: number
  updatedBy: number
  embType: number
}

// Requests
export interface IRequestPaginateEmbPos extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPaginateEmbPosDTO
}

export interface IRequestCreateEmbPos extends AuthorizedApiRequest {
  body: IEmbPosDTO
}

export interface IRequestEmbPos extends Omit<AuthorizedApiRequest, 'query'> {
  query: { embPosId?: number } & Omit<Partial<EmbroideryPosition>, 'id'>
}

export interface IRequestUpdateEmbPos extends Omit<AuthorizedApiRequest, 'query'> {
  body: Partial<IEmbPosDTO>
  query: { embPosId: number }
}

export interface IRequestSearchEmbroideryPosition extends Omit<AuthorizedApiRequest, 'query'> {
  query: IEmbPosFilter
}

// Responses
export interface IResponsePaginateEmbPos extends IResponseApi {
  data: EmbroideryPosition[]
}

export interface IResponseEmbPos extends IResponseApi {
  data: EmbroideryPosition
}
