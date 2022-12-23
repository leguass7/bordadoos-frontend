import { NextApiResponse } from 'next'

import { IRequestPurchaseConfigFilter } from './purchase-config.dto'
import { IPurchaseConfigService } from './purchase-config.service'

function getOne(purchaseConfigService: IPurchaseConfigService) {
  return async (req: IRequestPurchaseConfigFilter, res: NextApiResponse) => {
    const purchaseConfig = await purchaseConfigService.getPurchaseConfig(req.query)

    console.log(`\n\n AAAAAAAA \n\n`)
    console.log(`\n\n query: ${JSON.stringify(req.query)} \n\n`)
    console.log(`\n\n purchaseConfig: ${JSON.stringify(purchaseConfig)} \n\n`)

    return res.status(200).json({ success: true, data: purchaseConfig })
  }
}

export function factoryPurchaseConfigController(purchaseConfigService: IPurchaseConfigService) {
  return {
    getOne: getOne(purchaseConfigService)
  }
}
