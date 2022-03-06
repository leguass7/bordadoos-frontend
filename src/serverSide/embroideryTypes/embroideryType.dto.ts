import { EmbroideryType } from '@prisma/client'

import { IResponseApi } from '../api.interface'
import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import { PaginationQueryDto } from '../pagination/pagination.dto'

export interface IEmbroideryTypeFilter {
  search?: string
  actived?: boolean
}

export type IPaginateEmbroideryTypeDTO = PaginationQueryDto & IEmbroideryTypeFilter
export interface IEmbTypeDTO extends Omit<Partial<EmbroideryType>, 'id'> {
  label: string
  createdBy: number
  updatedBy: number
}

// Requests
export interface IRequestPaginateEmbroideryTypeDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPaginateEmbroideryTypeDTO
}

export interface IRequestCreateEmbtypeDto extends AuthorizedApiRequest {
  body: IEmbTypeDTO
}

export interface IRequestEmbroideryType extends Omit<AuthorizedApiRequest, 'query'> {
  query: { embTypeId?: number } & Omit<Partial<EmbroideryType>, 'id'>
}
export interface IRequestSearchEmbroideryType extends Omit<AuthorizedApiRequest, 'query'> {
  query: IEmbroideryTypeFilter
}

export interface IRequestUpdateEmbTypeDto extends Omit<AuthorizedApiRequest, 'query'> {
  body: Partial<IEmbTypeDTO>
  query: { embTypeId: number }
}

// Responses
export interface IResponsePaginateEmbroideryTypeDto extends IResponseApi {
  data: EmbroideryType[]
}

export interface IResponseEmbroideryDTO extends IResponseApi {
  data: EmbroideryType
}
