import { Prisma as PrismaTypes, Purchase } from '.prisma/client'

import { isDefined } from '~/helpers/variables'

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

async function findById(purchaseId: number): Promise<Purchase> {
  const purchase = await prisma.purchase.findFirst({
    where: { id: purchaseId },
    include: { client: true, category: true, type: true }
  })
  return purchase
}

async function paginate(
  pagination: PaginationQueryDto,
  filter: IPurchaseFilter = {}
): Promise<PaginationDto<Purchase>> {
  const { search, startDate, endDate, paid, done } = filter
  const where: PrismaTypes.PurchaseWhereInput = { id: { not: 0 } }

  if (search)
    where.AND = {
      OR: [
        { client: { name: { contains: search } } },
        { category: { label: { contains: search } } },
        { type: { label: { contains: search } } }
      ]
    }

  if (startDate && endDate) where.AND = { ...where.AND, deliveryDate: { lte: endDate, gte: startDate } }
  else {
    if (startDate) where.AND = { ...where.AND, deliveryDate: { gte: startDate } }
    if (endDate) where.AND = { ...where.AND, deliveryDate: { lte: endDate } }
  }

  if (isDefined(paid)) {
    const isPaid = parseInt(`${paid || 0}`) || 0
    where.AND = { ...where.AND, paid: !!(isPaid === 3) }
  }

  if (isDefined(done)) {
    const isDone = parseInt(`${done || 0}`) || 0
    where.AND = { ...where.AND, done: !!(isDone === 3) }
  }

  const allowedFields: (keyof Purchase)[] = [
    'id',
    'createdAt',
    'deliveryDate',
    'actived',
    'paid',
    'done',
    'qtd',
    'value'
  ]

  const spreadAllowed = (fields: (keyof Purchase)[]) =>
    fields.reduce((ac, at) => {
      ac[at] = true
      return ac
    }, {})

  const purchases = await PrismaService.paginate<Purchase>({
    model: 'Purchase',
    ...pagination,
    where,
    order: 'desc',
    orderBy: 'createdAt',
    select: {
      ...spreadAllowed(allowedFields),
      category: {
        select: {
          label: true
        }
      },
      client: {
        select: {
          name: true
        }
      },
      type: {
        select: {
          label: true
        }
      }
    }
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
  deletePurchase,
  findById
}

export type IPurchaseService = typeof PurchaseService
