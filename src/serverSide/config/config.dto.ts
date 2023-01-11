import { Configuration, Prisma } from '@prisma/client'

import { AuthorizedApiRequest } from '../auth/auth-protect.middleware'

export interface IConfigRetailPurchaseRules {
  maxQtd: number
  priceBelowJokerPoints: number
  pricePerThousandPoints: number
}

export interface IConfigWholesalePurchaseRules {
  pricePerThousandPoints: number
}

export interface IConfigPurchaseRules {
  retail: IConfigRetailPurchaseRules
  wholesale: IConfigWholesalePurchaseRules
}

interface IConfigFilter {
  key?: string
  [x: string]: string | string[]
}

export type ConfigWithMeta<T> = Configuration & { meta: T }

export interface IRequestConfigFilter extends AuthorizedApiRequest {
  query: IConfigFilter
}

export interface IRequestSaveConfigDTO extends IRequestConfigFilter {
  body: IConfigPurchaseRules
}

export interface CreateConfigDTO extends Omit<Partial<Configuration>, 'meta' | 'key'> {
  meta: IConfigPurchaseRules
}

export interface IResponseFindConfig {
  data: Configuration
}
