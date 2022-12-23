import { Purchase } from '.prisma/client'

import { IConfigPurchaseRules } from '~/serverSide/config/config.dto'
import { configService } from '~/serverSide/config/config.service'
import prisma from '~/serverSide/database/prisma'
import { priceRuleService } from '~/serverSide/priceRules/priceRule.service'

import { IPurchaseConfigFilter } from './purchase-config.dto'
import { calculatePurchaseOriginalValue, calculatePurchaseTotalValue } from './purchase-config.helper'

async function save(purchase: Purchase, ruleIds: number) {
  const { qtd, points, id } = purchase

  const config = await configService.getOne<IConfigPurchaseRules>('purchaseRules')
  if (!config) return null

  const originalValue = calculatePurchaseOriginalValue(qtd, points, config?.meta)

  const rules = await priceRuleService.listRules({ id: ruleIds })
  if (!rules) return null

  const totalValue = calculatePurchaseTotalValue(originalValue, qtd, rules)

  const jsonFields = {
    purchaseConfig: JSON.stringify(config),
    rules: JSON.stringify(rules)
  }

  const purchaseConfig = await prisma.purchaseConfig.upsert({
    create: { purchaseId: id, ...jsonFields, originalValue, totalValue },
    update: { ...jsonFields, originalValue, totalValue },
    where: { purchaseId: id }
  })

  return purchaseConfig
}

export async function getPurchaseConfig({ purchaseId }: IPurchaseConfigFilter) {
  const purchaseConfig = await prisma.purchaseConfig.findUnique({ where: { purchaseId } })
  return purchaseConfig
}

export const PurchaseConfigService = {
  save,
  getPurchaseConfig
}

export type IPurchaseConfigService = typeof PurchaseConfigService
