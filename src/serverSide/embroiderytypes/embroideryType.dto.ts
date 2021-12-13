import { Embroiderytype } from '@prisma/client'
import { NextApiRequest } from 'next'

import { IResponseApi } from '../api.interface'
import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import { PaginationQueryDto } from '../pagination/pagination.dto'

export interface IEmbroiderytypeFilter {
  search?: string
  actived?: boolean
}

export type IPaginateEmbroiderytypeDTO = PaginationQueryDto & IEmbroiderytypeFilter
export interface IEmbTypeDTO extends Omit<Partial<Embroiderytype>, 'id'> {
  label: string
  description: string
  createdBy: number
  updatedBy: number
}

// Requests
export interface IRequestPaginateEmbroiderytypeDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPaginateEmbroiderytypeDTO
}

export interface IRequestCreateEmbtypeDto extends AuthorizedApiRequest {
  body: IEmbTypeDTO
}

export interface IRequestEmbroideryType extends Omit<AuthorizedApiRequest, 'query'> {
  query: { embTypeId?: number } & Omit<Partial<Embroiderytype>, 'id'>
}

export interface IRequestUpdateEmbTypeDto extends Omit<AuthorizedApiRequest, 'query'> {
  body: Partial<IEmbTypeDTO>
  query: { embTypeId: number }
}

// Responses
export interface IResponsePaginateEmbroiderytypeDto extends IResponseApi {
  data: Embroiderytype[]
}

export interface IResponseEmbroideryDTO extends IResponseApi {
  data: Embroiderytype
}
