import { NextApiResponse } from 'next'

import { IRequestPurchaseConfigFilter } from './purchase-config.dto'
import { IPurchaseConfigService } from './purchase-config.service'

function getOne(purchaseConfigService: IPurchaseConfigService) {
  return async (req: IRequestPurchaseConfigFilter, res: NextApiResponse) => {
    const purchaseConfig = await purchaseConfigService.getPurchaseConfig(req.query)

    return res.status(200).json({ success: true, data: purchaseConfig })
  }
}

export function factoryPurchaseConfigController(purchaseConfigService: IPurchaseConfigService) {
  return {
    getOne: getOne(purchaseConfigService)
  }
}
