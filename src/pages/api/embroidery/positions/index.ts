import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryPositionController } from '~/serverSide/embroideryPositions/embroideryPosition.controller'
import { EmbroideryPositionService } from '~/serverSide/embroideryPositions/embroideryPosition.service'
import { embPosValidation } from '~/serverSide/embroideryPositions/embroideryPosition.validation'
import { ncConfig } from '~/serverSide/ErrorApi'
import { preparePagination } from '~/serverSide/middlewares/paginate'

const controller = factoryEmbroideryPositionController(EmbroideryPositionService)

const handler = nc(ncConfig)
  .use(authProtect)
  .get(preparePagination, controller.paginate)
  .post(embPosValidation, controller.create)

export default handler
