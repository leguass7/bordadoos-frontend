import type { NextApiRequest, NextApiResponse } from 'next'

import ErrorApi from '../ErrorApi'
import { PaginationQueryDto } from '../pagination/pagination.dto'
import type {
  IRequestCreateEmbPos,
  IRequestEmbPos,
  IRequestSearchEmbroideryPosition,
  IRequestUpdateEmbPos,
  IResponseEmbPos,
  IResponsePaginateEmbPos
} from './EmbroideryPosition.dto'
import { IEmbroideryPositionService } from './embroideryPosition.service'

function paginate(embroideryPositionService: IEmbroideryPositionService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponsePaginateEmbPos>) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await embroideryPositionService.paginate(paginateData, filter)
    return res.status(200).json({ success: true, data, ...pagination })
  }
}

function findOne(EmbroideryPositionService: IEmbroideryPositionService) {
  return async (req: IRequestEmbPos, res: NextApiResponse<IResponseEmbPos>) => {
    const data = await EmbroideryPositionService.findOne({ id: req.query.embPosId })
    return res.status(200).json({ success: true, data })
  }
}

function create(EmbroideryPositionService: IEmbroideryPositionService) {
  return async (req: IRequestCreateEmbPos, res: NextApiResponse<IResponseEmbPos>) => {
    const { userId } = req.auth
    const { label, embType } = req.body

    const hasEmb = await EmbroideryPositionService.findOne({ label, embType })
    if (hasEmb) throw ErrorApi({ status: 400, message: 'embroidery position already exists' })

    const data = await EmbroideryPositionService.create({ ...req.body, createdBy: userId, updatedBy: userId })
    return res.status(201).json({ success: true, data })
  }
}

function update(EmbroideryPositionService: IEmbroideryPositionService) {
  return async (req: IRequestUpdateEmbPos, res: NextApiResponse) => {
    const { query, body, auth } = req

    const hasEmb = await EmbroideryPositionService.findOne({ id: query.embPosId })
    if (!hasEmb) throw ErrorApi({ status: 400, message: "embroidery position doesn't exists" })

    await EmbroideryPositionService.update(query.embPosId, { ...body, updatedBy: auth.userId })
    return res.status(201).json({ success: true })
  }
}

function search(embroideryPositionService: IEmbroideryPositionService) {
  return async (req: IRequestSearchEmbroideryPosition, res: NextApiResponse) => {
    const { search } = req.query
    // if (!search) return res.status(200).json({ success: true, positions: [] })

    const positions = await embroideryPositionService.search({ search })
    return res.status(200).json({ success: true, positions })
  }
}

export function factoryEmbroideryPositionController(embroideryPositionService: IEmbroideryPositionService) {
  return {
    paginate: paginate(embroideryPositionService),
    create: create(embroideryPositionService),
    update: update(embroideryPositionService),
    search: search(embroideryPositionService),
    findOne: findOne(embroideryPositionService)
  }
}
