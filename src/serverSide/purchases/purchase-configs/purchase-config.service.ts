import { Purchase, PurchaseRules } from '.prisma/client'

import { IConfigPurchaseRules } from '~/serverSide/config/config.dto'
import { configService } from '~/serverSide/config/config.service'
import prisma from '~/serverSide/database/prisma'
import { priceRuleService } from '~/serverSide/priceRules/priceRule.service'

import { IPurchaseConfigFilter } from './purchase-config.dto'
import { calculatePurchaseOriginalValue, calculatePurchaseTotalValue } from './purchase-config.helper'

async function save(purchase: Purchase, ruleIds: number[], isAdmin = false) {
  const { qtd, points, id, value } = purchase

  const config = await configService.getOne<IConfigPurchaseRules>('purchaseRules')
  if (!config?.meta) return null

  const originalValue = calculatePurchaseOriginalValue(qtd, points, config?.meta)
  const isRetail = !!(purchase.qtd <= config.meta.retail.maxQtd)

  const rules = await priceRuleService.listRules({ id: ruleIds })
  if (!rules) return null

  const forceValue = !!(isAdmin && value)
  const totalValue = forceValue ? value : calculatePurchaseTotalValue(originalValue, qtd, rules)

  const purchaseRule: PurchaseRules = isRetail ? 'RETAIL' : 'WHOLESALE'

  const data = { originalValue, totalValue, purchaseRule }
  const priceRules = ruleIds.map(id => ({ id }))

  const purchaseConfig = await prisma.purchaseConfig.upsert({
    create: { purchaseId: id, ...data, priceRules: { connect: priceRules } },
    update: { ...data, priceRules: { set: priceRules } },
    where: { purchaseId: id }
  })

  return purchaseConfig
}

export async function getPurchaseConfig({ purchaseId }: IPurchaseConfigFilter) {
  const purchaseConfig = await prisma.purchaseConfig.findUnique({
    where: { purchaseId },
    include: { priceRules: true }
  })
  return purchaseConfig
}

export const purchaseConfigService = {
  save,
  getPurchaseConfig
}

export type IPurchaseConfigService = typeof purchaseConfigService
