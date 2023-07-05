import { PriceRules } from '@prisma/client'

import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'

export interface PriceRuleFilter {
  label?: string
  actived?: boolean
  id?: number | number[]
  purchaseConfigId?: string
  purchaseId?: number
}

export interface IRequestPriceRuleFilter extends Omit<AuthorizedApiRequest, 'query'> {
  query: PriceRuleFilter
}

export interface IRequestCreatePriceRules extends AuthorizedApiRequest {
  body: PriceRules[]
}

export interface IResponseListPriceRules {
  data: PriceRules[]
}
