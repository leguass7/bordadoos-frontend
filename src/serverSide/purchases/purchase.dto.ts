import { Purchase } from '@prisma/client'

import { IResponseApi } from '../api.interface'
import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'

export interface IPurchaseFilter {
  search?: string
  purchaseId?: number
  clientId?: number
  actived?: boolean
  phone?: string
  startDate?: Date
  endDate?: Date
  paid?: boolean
  done?: boolean
}

export interface IRequestFilter extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPurchaseFilter
}

export interface IResponsePurchase extends IResponseApi {
  purchase: Purchase
}

export interface IResponsePaginatePurchaseDto extends IResponseApi {
  data: Purchase[]
}
