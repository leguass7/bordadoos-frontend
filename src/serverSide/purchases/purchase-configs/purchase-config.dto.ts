import { NextApiRequest } from 'next'

export interface IPurchaseConfigFilter {
  purchaseId: number
}

export interface IRequestPurchaseConfigFilter extends Omit<NextApiRequest, 'query'> {
  query: IPurchaseConfigFilter
}
