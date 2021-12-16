import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryTypeController } from '~/serverSide/embroideryTypes/embroideryType.controller'
import { EmbroideryTypeService } from '~/serverSide/embroideryTypes/embroideryType.service'
import { embtypeValidation } from '~/serverSide/embroideryTypes/embroideryType.validation'
import { ncConfig } from '~/serverSide/ErrorApi'
import { preparePagination } from '~/serverSide/middlewares/paginate'

const controller = factoryEmbroideryTypeController(EmbroideryTypeService)

const handler = nc(ncConfig)
  .use(authProtect)
  .get(preparePagination, controller.paginate)
  .post(embtypeValidation, controller.create)

export default handler
