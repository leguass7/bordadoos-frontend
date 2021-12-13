import type { NextApiRequest, NextApiResponse } from 'next'

import { PaginationQueryDto } from '../pagination/pagination.dto'
import type { IResponsePaginateEmbroideryTypeDto } from './embroideryType.dto'
import type { IEmbroideryTypeService } from './embroideryType.service'

function paginate(embroideryTypeService: IEmbroideryTypeService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponsePaginateEmbroideryTypeDto>) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await embroideryTypeService.paginate(paginateData, filter)
    return res.status(200).json({ success: true, data, ...pagination })
  }
}

export function factoryEmbroideryTypeController(embroideryTypeService: IEmbroideryTypeService) {
  return {
    paginate: paginate(embroideryTypeService)
  }
}
