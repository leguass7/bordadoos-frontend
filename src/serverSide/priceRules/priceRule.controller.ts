import type { NextApiResponse } from 'next'

import { IRequestCreatePriceRules, IRequestPriceRuleFilter } from './priceRule.dto'
import { IPriceRuleService } from './priceRule.service'

function listPriceRules(priceRuleService: IPriceRuleService) {
  return async (req: IRequestPriceRuleFilter, res: NextApiResponse) => {
    const data = await priceRuleService.listRules(req.query)

    return res.status(200).json({ success: true, data })
  }
}

function bulkCreatePriceRules(priceRuleService: IPriceRuleService) {
  return async (req: IRequestCreatePriceRules, res: NextApiResponse) => {
    const { userId } = req.auth
    const data = await priceRuleService.bulkCreateRules(req.body, userId)

    return res.status(201).json({ success: true, data, message: 'Regras atualizadas com sucesso' })
  }
}

function deletePriceRule(priceRuleService: IPriceRuleService) {
  return async (req: IRequestPriceRuleFilter, res: NextApiResponse) => {
    const { userId } = req.auth
    const data = await priceRuleService.deleteRule(req.query?.id as any, userId)

    return res.status(202).json({ success: true, data })
  }
}

export function factoryPriceRuleController(priceRuleService: IPriceRuleService) {
  return {
    listPriceRules: listPriceRules(priceRuleService),
    deletePriceRule: deletePriceRule(priceRuleService),
    bulkCreatePriceRules: bulkCreatePriceRules(priceRuleService)
  }
}
