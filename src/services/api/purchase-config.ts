import { IPurchaseConfigFilter } from '~/serverSide/purchases/purchase-configs/purchase-config.dto'

import { api } from '.'

export async function getPurchaseConfig({ purchaseId, ...filter }: IPurchaseConfigFilter) {
  const params = new URLSearchParams(filter as any)
  const query = params ? `?${params}` : ''

  const response = await api.get(`/purchases/purchase-config/${purchaseId}${query}`)
  return response.data
}
