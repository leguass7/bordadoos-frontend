import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { factoryPurchaseConfigController } from '~/serverSide/purchases/purchase-configs/purchase-config.controller'
import { purchaseConfigService } from '~/serverSide/purchases/purchase-configs/purchase-config.service'
import { filterPurchaseConfigSchema } from '~/serverSide/purchases/purchase-configs/purchase-config.validation'

const controller = factoryPurchaseConfigController(purchaseConfigService)

const handler = nc(ncConfig).use(authProtect).get(filterPurchaseConfigSchema, controller.getOne)

export default handler
