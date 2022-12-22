import { PriceRuleModality, PriceRuleType, Prisma, Purchase, PurchaseConfig } from '.prisma/client'

import {
  IConfigPurchaseRules,
  IConfigRetailPurchaseRules,
  IConfigWholesalePurchaseRules
} from '~/serverSide/config/config.dto'
import { configService } from '~/serverSide/config/config.service'
import prisma from '~/serverSide/database/prisma'
import { priceRuleService } from '~/serverSide/priceRules/priceRule.service'

function calculateRetailPrice(points: number, retail: IConfigRetailPurchaseRules) {
  const { priceBelowJokerPoints, pricePerThousandPoints } = retail
  const jokerPoints = 10000

  return points <= jokerPoints ? priceBelowJokerPoints : ((points - jokerPoints) / 1000) * pricePerThousandPoints
}

function calculateWholesalePrice(points: number, { pricePerThousandPoints }: IConfigWholesalePurchaseRules) {
  return (points / 1000) * pricePerThousandPoints
}

async function save(purchase: Partial<Purchase>, ruleIds: number): Promise<any> {
  const { qtd, points, id } = purchase

  const config = await configService.getOne<{ meta?: IConfigPurchaseRules }>('purchaseRules')
  if (!config) return null

  const meta = config.meta

  let originalValue = 0

  const isRetail = !!(qtd <= meta?.retail?.maxQtd)

  originalValue = isRetail
    ? calculateRetailPrice(points, meta?.retail)
    : calculateWholesalePrice(points, meta?.wholesale)

  const unityValue = originalValue
  originalValue *= qtd

  const rules = await priceRuleService.listRules({ id: ruleIds })
  const totalValue = rules.reduce((ac, at) => {
    const { modality, type, value } = at

    const percValue = value / 100 + 1

    if (modality === PriceRuleModality.QUANTITY)
      ac += type === PriceRuleType.FIXED ? (unityValue + value) * qtd : originalValue * percValue
    else {
      if (type === PriceRuleType.FIXED) ac += originalValue + value
      else ac *= percValue
    }

    return ac
  }, 0)

  const jsonFields = {
    purchaseConfig: config as unknown as Prisma.JsonValue,
    rules: rules as unknown as Prisma.JsonValue
  }

  const purchaseConfig = await prisma.purchaseConfig.create({
    data: { purchaseId: id, ...jsonFields, originalValue, totalValue }
  })

  return purchaseConfig
}

export const PurchaseConfigService = {
  save
}

export type IPurchaseConfigService = typeof PurchaseConfigService
