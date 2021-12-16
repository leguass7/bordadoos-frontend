import type { NextApiRequest, NextApiResponse } from 'next'

import ErrorApi from '../ErrorApi'
import { PaginationQueryDto } from '../pagination/pagination.dto'
import type {
  IRequestCreateEmbtypeDto,
  IRequestEmbroideryType,
  IRequestUpdateEmbTypeDto,
  IResponseEmbroideryDTO,
  IResponsePaginateEmbroideryTypeDto
} from './embroideryType.dto'
import type { IEmbroideryTypeService } from './embroideryType.service'

function paginate(embroideryTypeService: IEmbroideryTypeService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponsePaginateEmbroideryTypeDto>) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await embroideryTypeService.paginate(paginateData, filter)
    return res.status(200).json({ success: true, data, ...pagination })
  }
}

function findOne(embroideryTypeService: IEmbroideryTypeService) {
  return async (req: IRequestEmbroideryType, res: NextApiResponse<IResponseEmbroideryDTO>) => {
    const data = await embroideryTypeService.findOne({ id: req.query.embTypeId })
    return res.status(200).json({ success: true, data })
  }
}

function create(embroideryTypeService: IEmbroideryTypeService) {
  return async (req: IRequestCreateEmbtypeDto, res: NextApiResponse<IResponseEmbroideryDTO>) => {
    const { userId } = req.auth
    const { description, label } = req.body

    const hasEmb = await embroideryTypeService.searchOne({ description, label })
    if (hasEmb) throw ErrorApi({ status: 400, message: 'embroidery type already exists' })

    const data = await embroideryTypeService.create({ ...req.body, createdBy: userId, updatedBy: userId })
    return res.status(201).json({ success: true, data })
  }
}

function update(embroideryTypeService: IEmbroideryTypeService) {
  return async (req: IRequestUpdateEmbTypeDto, res: NextApiResponse) => {
    const { query, body, auth } = req

    const hasEmb = await embroideryTypeService.findOne({ id: query.embTypeId })
    if (!hasEmb) throw ErrorApi({ status: 400, message: "embroidery type doesn't exists" })

    await embroideryTypeService.update(query.embTypeId, { ...body, updatedBy: auth.userId })
    return res.status(201).json({ success: true })
  }
}

export function factoryEmbroideryTypeController(embroideryTypeService: IEmbroideryTypeService) {
  return {
    paginate: paginate(embroideryTypeService),
    create: create(embroideryTypeService),
    findOne: findOne(embroideryTypeService),
    update: update(embroideryTypeService)
  }
}
