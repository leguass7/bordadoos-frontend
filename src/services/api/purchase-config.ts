import { NewResponseApi } from '~/serverSide/api.interface'
import {
  FindOnePurchaseConfig,
  IPurchaseConfigFilter
} from '~/serverSide/purchases/purchase-configs/purchase-config.dto'

import { api } from '.'

export async function getPurchaseConfig({
  purchaseId,
  ...filter
}: IPurchaseConfigFilter): Promise<NewResponseApi<FindOnePurchaseConfig>> {
  const params = new URLSearchParams(filter as any)
  const query = params ? `?${params}` : ''

  const response = await api.get(`/purchases/purchase-config/${purchaseId}${query}`)
  return response.data
}
