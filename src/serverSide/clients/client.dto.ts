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

export interface ICreateClientDto {
  id?: number
  name: string
  phone: string
  doc?: string
  actived?: boolean
}

export interface IPaginateClientDTO extends PaginationQueryDto, Client {}

export interface IRequestPaginateClientDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: Record<keyof IPaginateClientDTO, string> | IPaginateClientDTO
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
