import { Embroiderytype } from '@prisma/client'

import { IResponseApi } from '../api.interface'
import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import { PaginationQueryDto } from '../pagination/pagination.dto'

export interface IEmbroiderytypeFilter {
  search?: string
  actived?: boolean
}

export type IPaginateEmbroiderytypeDTO = PaginationQueryDto & IEmbroiderytypeFilter

export interface IRequestPaginateEmbroiderytypeDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPaginateEmbroiderytypeDTO
}

export interface IResponsePaginateEmbroiderytypeDto extends IResponseApi {
  data: Embroiderytype[]
}
