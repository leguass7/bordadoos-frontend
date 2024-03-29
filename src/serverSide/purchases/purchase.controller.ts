import type { NextApiRequest, NextApiResponse } from 'next'

import { removeInvalidValues } from '~/helpers/object'
import { isDefined } from '~/helpers/variables'

import { IResponseApi } from '../api.interface'
import ErrorApi from '../ErrorApi'
import { PaginationQueryDto } from '../pagination/pagination.dto'
import { IPurchaseConfigService, purchaseConfigService } from './purchase-configs/purchase-config.service'
import type { IRequestFilter, IResponsePaginatePurchaseDto, IResponsePurchase } from './purchase.dto'
import type { IPurchaseService } from './purchase.service'

function create(purchaseService: IPurchaseService, purchaseConfigService: IPurchaseConfigService) {
  return async (req: IRequestFilter, res: NextApiResponse) => {
    const { userId, level } = req.auth
    const body = removeInvalidValues(req.body)

    // TEMP
    // if (!req.body?.typeId) req.body.typeId = null
    // if (!req.body?.categoryId) req.body.categoryId = null
    // if (!req.body?.points) req.body.points = null

    const data: any = {
      ...body,
      updatedBy: userId,
      createdBy: userId,
      rules: undefined
    }

    const isAdmin = level >= 8

    const createdPurchase = await purchaseService.create(data)
    if (!createdPurchase) throw ErrorApi({ status: 500, message: 'error while creating purchase' })

    const rules = req.body?.rules

    const config = await purchaseConfigService.save(createdPurchase, rules, isAdmin)

    const value = config?.totalValue
    const isCustomValue = data?.value && isAdmin

    const purchase = isCustomValue ? createdPurchase : await purchaseService.update(createdPurchase.id, { value })

    return res.status(201).json({ purchase })
  }
}

function update(purchaseService: IPurchaseService, purchaseConfigService: IPurchaseConfigService) {
  return async (req: IRequestFilter, res: NextApiResponse<IResponsePurchase>) => {
    const { userId, level } = req.auth
    const { purchaseId } = req.query
    const body = removeInvalidValues(req.body)

    if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

    // TEMP
    // if (!req.body?.typeId) req.body.typeId = null
    // if (!req.body?.categoryId) req.body.categoryId = null
    // if (!req.body?.points) req.body.points = null

    const data = { ...body, updatedBy: userId, rules: undefined }
    const isAdmin = level >= 8

    const updatedPurchase = await purchaseService.update(purchaseId, data)

    const rules = req.body?.rules

    if (rules) {
      const config = await purchaseConfigService.save(updatedPurchase, rules, isAdmin)

      const value = config?.totalValue
      const isCustomValue = data?.value && isAdmin

      const purchase = isCustomValue ? updatedPurchase : await purchaseService.update(updatedPurchase.id, { value })

      return res.status(201).json({ purchase })
    }

    return res.status(201).json({ purchase: updatedPurchase })

    // const diffValues = config?.totalValue !== updatedPurchase?.value
    // const value = diffValues ? config.totalValue : updatedPurchase?.value

    // const purchase =
    //   diffValues && !isAdmin ? await purchaseService.update(updatedPurchase.id, { value }) : updatedPurchase
  }
}

function paginate(purchaseService: IPurchaseService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponsePaginatePurchaseDto>) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await purchaseService.paginate(paginateData, filter)

    return res.status(200).json({ success: true, data, ...pagination })
  }
}

function findById(purchaseService: IPurchaseService) {
  return async (req: IRequestFilter, res: NextApiResponse<IResponsePurchase>) => {
    const { purchaseId = 0 } = req.query

    const purchase = await purchaseService.findById(purchaseId)

    return res.status(200).json({ success: true, purchase })
  }
}

function remove(purchaseService: IPurchaseService) {
  return async (req: IRequestFilter, res: NextApiResponse<IResponseApi>) => {
    const { purchaseId } = req.query
    const { userId } = req.auth

    const success = await purchaseService.deletePurchase(purchaseId, userId)
    if (!success) throw ErrorApi({ status: 500, message: 'Error on delete purchase' })

    return res.status(202).json({ success })
  }
}

export function factoryPurchaseController(purchaseService: IPurchaseService) {
  return {
    create: create(purchaseService, purchaseConfigService),
    paginate: paginate(purchaseService),
    update: update(purchaseService, purchaseConfigService),
    findById: findById(purchaseService),
    remove: remove(purchaseService)
  }
}
