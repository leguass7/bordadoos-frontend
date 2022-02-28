import { Prisma as PrismaTypes, Purchase } from '.prisma/client'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { IPurchaseFilter } from './purchase.dto'

async function create(data: Purchase): Promise<Purchase> {
  const purchase = await prisma.purchase.create({ data })
  return purchase
}

async function update(purchaseId: number, data: Partial<Purchase>): Promise<Purchase> {
  const purchase = await prisma.purchase.update({ data, where: { id: purchaseId } })
  return purchase
}

async function paginate(
  pagination: PaginationQueryDto,
  filter: IPurchaseFilter = {}
): Promise<PaginationDto<Purchase>> {
  const { search, actived = false } = filter
  const where: PrismaTypes.PurchaseWhereInput = { id: { not: 0 }, actived }

  if (search)
    where.AND = {
      OR: [{ deliveryDate: search }]
    }

  const purchases = await PrismaService.paginate<Purchase>({
    model: 'Purchase',
    ...pagination,
    where
  })

  return purchases
}

async function deletePurchase(purchaseId: number, userId: number, force = false): Promise<boolean> {
  try {
    const where: PrismaTypes.PurchaseWhereInput & PrismaTypes.PurchaseWhereUniqueInput = {
      id: purchaseId,
      updatedBy: userId
    }

    if (force) await prisma.purchase.delete({ where })
    else await prisma.purchase.update({ data: { actived: false }, where })

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const PurchaseService = {
  create,
  update,
  paginate,
  deletePurchase
}

export type IPurchaseService = typeof PurchaseService
