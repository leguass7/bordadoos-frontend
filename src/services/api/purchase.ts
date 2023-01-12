import { EmbroideryPosition, EmbroideryType, Prisma, Purchase } from '@prisma/client'

import { IResponsePurchase } from '~/serverSide/purchases/purchase.dto'

import { getDefault } from '.'

export type PurchaseWithItems = Prisma.PurchaseGetPayload<{
  include: { client: true; category: true; type: true }
}>

type FindResponse = {
  purchase?: PurchaseWithItems
  categories?: EmbroideryPosition[]
  types?: EmbroideryType[]
}

export async function findPurchaseWithItems(purchaseId?: number): Promise<FindResponse> {
  let response
  if (purchaseId) response = await getDefault<IResponsePurchase>(`/purchases/${purchaseId}`)

  const data: FindResponse = {
    purchase: response?.purchase
  }

  const typesResponse = await getDefault<{ types: EmbroideryType[] }>('/embroidery/types/search')
  if (typesResponse?.success && typesResponse?.types) data.types = typesResponse.types

  if (data?.purchase?.typeId) {
    const categoriesResponse = await getDefault<{ positions: EmbroideryPosition[] }>(
      `/embroidery/positions/search?typeId=${data?.purchase?.typeId}`
    )
    if (categoriesResponse) data.categories = categoriesResponse.positions
  }

  return data
}
