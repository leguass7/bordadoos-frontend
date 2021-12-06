import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import { isDefined } from '~/helpers/variables'

import { PaginationOrder, PaginationQueryDto } from '../pagination/pagination.dto'

export const preparePagination = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  const { query, body } = req

  const { page = 1, size = 10, order, orderBy, ...filter } = query

  const resultPaginate: PaginationQueryDto = {}
  Object.assign(resultPaginate, filter)

  resultPaginate.page = parseInt(page || body.page, 10) || undefined
  resultPaginate.size = parseInt(size || body.size, 10) || undefined
  resultPaginate.order = `${order || 'asc'}` as PaginationOrder

  if (isDefined(order)) resultPaginate.order = `${order || 'asc'}` as PaginationOrder
  if (isDefined(orderBy)) resultPaginate.orderBy = `${orderBy}`

  req.query = resultPaginate as any

  next()
}
