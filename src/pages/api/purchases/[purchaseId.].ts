import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { factoryPurchaseController } from '~/serverSide/purchases/purchase.controller'
import { PurchaseService } from '~/serverSide/purchases/purchase.service'
import { deletePurchasesSchema, updatePurchasesSchema } from '~/serverSide/purchases/purchase.validation'

const controller = factoryPurchaseController(PurchaseService)

const handler = nc(ncConfig)
  .use(authProtect)
  .delete(deletePurchasesSchema, controller.remove)
  .put(updatePurchasesSchema, controller.update)

export default handler
