import { NextApiRequest } from 'next'

import { Prisma } from '@prisma/client'

export interface IPurchaseConfigFilter {
  purchaseId: number
}

export interface IRequestPurchaseConfigFilter extends Omit<NextApiRequest, 'query'> {
  query: IPurchaseConfigFilter
}

export type FindOnePurchaseConfig = Partial<Prisma.PurchaseConfigGetPayload<{ include: { priceRules: true } }>>
