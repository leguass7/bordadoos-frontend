import { PriceRules } from '@prisma/client'

import { IResponseListPriceRules, PriceRuleFilter } from '~/serverSide/priceRules/priceRule.dto'

import { api } from '.'

export async function listPriceRules(filter?: PriceRuleFilter): Promise<IResponseListPriceRules> {
  const params = new URLSearchParams(filter as any)
  const query = params ? `?${params}` : ''

  const response = await api.get(`/priceRules${query}`)
  return response.data
}

export async function savePriceRules(data: Partial<PriceRules>[]) {
  const preparedData = data.map(({ id, ...rest }) => {
    return `${id}` === '' ? rest : { id, ...rest }
  })

  const response = await api.post('/priceRules', preparedData)
  return response.data
}

export async function deletePriceRule(id: number) {
  const response = await api.delete(`/priceRules/${id}`)
  return response.data
}
