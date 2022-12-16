import { PriceRules, Prisma } from '@prisma/client'

import prisma from '../database/prisma'
import ErrorApi from '../ErrorApi'
import { PriceRuleFilter } from './priceRule.dto'

async function listRules(filter: PriceRuleFilter) {
  const where: Prisma.PriceRulesWhereInput = { ...filter, actived: true }
  const rules = await prisma.priceRules.findMany({ where })
  return rules
}

async function deleteRule(id: number, userId: number) {
  if (!id) return null

  const rule = await prisma.priceRules.update({ where: { id }, data: { actived: false, updatedBy: userId } })
  return rule
}

async function bulkCreateRules(data: PriceRules[], userId: number) {
  const dataWithIds = data.map(d => ({ ...d, createdBy: userId, updatedBy: userId }))
  const rules = await prisma.priceRules.createMany({
    skipDuplicates: true,
    data: dataWithIds
  })
  if (!rules) throw ErrorApi('Erro na atualização das regras')
  return rules
}

export const priceRuleService = {
  listRules,
  bulkCreateRules,
  deleteRule
}

export type IPriceRuleService = typeof priceRuleService
