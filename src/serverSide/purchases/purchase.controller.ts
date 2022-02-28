import type { NextApiRequest } from 'next'

import { IResponseApi } from '../api.interface'
import ErrorApi from '../ErrorApi'
import { PaginationQueryDto } from '../pagination/pagination.dto'
import type { IRequestFilter, IResponsePaginatePurchaseDto, IResponsePurchase } from './purchase.dto'
import type { IPurchaseService } from './purchase.service'

function create(purchaseService: IPurchaseService) {
  return async (req: IRequestFilter, res: IResponsePurchase) => {
    const { userId } = req.auth

    const purchase = await purchaseService.create({ ...req.body, updatedBy: userId, createdBy: userId })
    if (!purchase) throw ErrorApi({ status: 500, message: 'error while creating purchase' })

    return res.status(201).json({ purchase })
  }
}

function update(purchaseService: IPurchaseService) {
  return async (req: IRequestFilter, res: IResponsePurchase) => {
    const { userId } = req.auth
    const { purchaseId } = req.query

    if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

    const purchase = await purchaseService.update(purchaseId, { ...req.body, updatedBy: userId })
    return res.status(201).json({ purchase })
  }
}

function paginate(purchaseService: IPurchaseService) {
  return async (req: NextApiRequest, res: IResponsePaginatePurchaseDto) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await purchaseService.paginate(paginateData, filter)
    return res.status(200).json({ success: true, data, ...pagination })
  }
}

function remove(purchaseService: IPurchaseService) {
  return async (req: IRequestFilter, res: IResponseApi) => {
    const { purchaseId } = req.query
    const { userId } = req.auth

    const success = await purchaseService.deletePurchase(purchaseId, userId)
    if (!success) throw ErrorApi({ status: 500, message: 'Error on delete purchase' })

    return res.status(202).json({ success, userId })
  }
}

export function factoryPurchaseController(purchaseService: IPurchaseService) {
  return {
    create: create(purchaseService),
    paginate: paginate(purchaseService),
    update: update(purchaseService),
    remove: remove(purchaseService)
  }
}
