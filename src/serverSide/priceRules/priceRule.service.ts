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

async function bulkUpdateRules(data: PriceRules[], userId: number) {
  const ids = data.map(d => d.id)

  const rules = await prisma.priceRules.findMany({ where: { id: { in: ids } } })

  const updated = data.filter(d => {
    const found = rules.find(r => d.id === r.id)
    const hasDifferentValue = Object.keys(found).filter(key => found[key] !== d[key])

    if (!!hasDifferentValue?.length) return d
  })

  const promises = updated.map(up => {
    return prisma.priceRules.update({ where: { id: up.id }, data: { ...up, updatedBy: userId } })
  })

  const result = await Promise.all(promises)

  return result
}

async function bulkCreateRules(data: PriceRules[], userId: number) {
  const dataWithIds = data.map(d => ({ ...d, createdBy: userId, updatedBy: userId }))
  const duplicates = data.filter(d => !!d?.id)

  await bulkUpdateRules(duplicates, userId)
  const notDuplicates = dataWithIds.filter(d => !d?.id)

  const rules = await prisma.priceRules.createMany({
    data: notDuplicates
  })

  if (!rules) throw ErrorApi('Erro na atualização das regras')

  return rules
}

export const priceRuleService = {
  listRules,
  bulkCreateRules,
  deleteRule,
  bulkUpdateRules
}

export type IPriceRuleService = typeof priceRuleService
