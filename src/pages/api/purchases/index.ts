import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { preparePagination } from '~/serverSide/middlewares/paginate'
import { factoryPurchaseController } from '~/serverSide/purchases/purchase.controller'
import { PurchaseService } from '~/serverSide/purchases/purchase.service'
import { createPurchasesSchema, listPurchasesSchema } from '~/serverSide/purchases/purchase.validation'

const controller = factoryPurchaseController(PurchaseService)

const handler = nc(ncConfig)
  .get(listPurchasesSchema, preparePagination, controller.paginate)
  .use(authProtect)
  .post(createPurchasesSchema, controller.create)

export default handler
