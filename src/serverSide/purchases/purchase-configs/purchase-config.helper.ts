import { PriceRuleModality, PriceRules, PriceRuleType } from '@prisma/client'

import type {
  IConfigPurchaseRules,
  IConfigRetailPurchaseRules,
  IConfigWholesalePurchaseRules
} from '~/serverSide/config/config.dto'

function calculateRetailPrice(points: number, retail: IConfigRetailPurchaseRules) {
  const { priceBelowJokerPoints, pricePerThousandPoints } = retail
  const jokerPoints = 10000

  if (!points) return 0

  return points <= jokerPoints
    ? priceBelowJokerPoints
    : priceBelowJokerPoints + ((points - jokerPoints) / 1000) * pricePerThousandPoints
}

function calculateWholesalePrice(points: number, { pricePerThousandPoints }: IConfigWholesalePurchaseRules) {
  return (points / 1000) * pricePerThousandPoints
}

export function calculatePurchaseOriginalValue(
  qtd = 0,
  points = 0,
  developmentPrice = 0,
  config?: IConfigPurchaseRules,
  uValue?: number
) {
  if (!config.retail || !config.wholesale) return 0
  const isRetail = !!(qtd <= config?.retail?.maxQtd)

  let unityValue = uValue

  if (points || !uValue)
    unityValue = isRetail
      ? calculateRetailPrice(points, config?.retail)
      : calculateWholesalePrice(points, config?.wholesale)

  const price = unityValue * qtd
  const originalValue = price + developmentPrice

  return originalValue
}

export function calculatePurchaseTotalValue(originalValue: number, qtd: number, rules: PriceRules[] = []) {
  if (!rules?.length) return originalValue

  // adicionar valores percentuais primeiro para que não hajam discrepâncias com base na ordem das regras
  const sortedRules = rules.sort((a, b) => {
    const order = a.type === 'PERC' ? -1 : 0
    return order
  })

  const totalPrice = sortedRules.reduce((ac, at) => {
    const { modality, type, value } = at

    const percValue = value / 100 + 1

    // Percentual só funciona porque todas as peças têm o mesmo valor, assim, se todas dobrarem de valor, o total também dobra por exemplo
    if (type === PriceRuleType.PERC) ac *= percValue
    else {
      if (modality === PriceRuleModality.QUANTITY) ac += value * qtd
      else ac += value
    }

    return ac
  }, originalValue)

  return totalPrice
}
