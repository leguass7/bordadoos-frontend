import { Client } from '@prisma/client'

import type { IResponseApi } from '../api.interface'
import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import { PaginationQueryDto } from '../pagination/pagination.dto'

export interface IResponseClientDto extends IResponseApi {
  clientId?: number
  client?: Client
}

export interface IResponsePaginateClientDto extends IResponseApi {
  data: Client[]
}

export interface ICreateClientDto extends Partial<Client> {
  name: string
  phone: string
  createdBy: number
}

export interface IClientFilter {
  search?: string
  actived?: boolean
}

export type IPaginateClientDTO = PaginationQueryDto & IClientFilter

export interface IRequestPaginateClientDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPaginateClientDTO
}

export interface IRequestCreateClientDto extends AuthorizedApiRequest {
  body: ICreateClientDto
}

export interface IRequestUpdateClientDto extends AuthorizedApiRequest {
  body: Partial<ICreateClientDto>
  query: { clientId: string }
}

export interface IRequestClientDto extends AuthorizedApiRequest {
  query: { clientId: string }
}
