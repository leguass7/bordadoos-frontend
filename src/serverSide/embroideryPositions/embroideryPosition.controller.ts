import type { NextApiRequest, NextApiResponse } from 'next'

import { PaginationQueryDto } from '../pagination/pagination.dto'
import type { IResponsePaginateEmbroideryPositionDto } from './EmbroideryPosition.dto'
import type { IEmbroideryPositionService } from './embroideryPosition.service'

function paginate(embroideryPositionService: IEmbroideryPositionService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponsePaginateEmbroideryPositionDto>) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await embroideryPositionService.paginate(paginateData, filter)
    return res.status(200).json({ success: true, data, ...pagination })
  }
}

export function factoryEmbroideryPositionController(embroideryPositionService: IEmbroideryPositionService) {
  return {
    paginate: paginate(embroideryPositionService)
  }
}
