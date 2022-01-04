import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryPositionController } from '~/serverSide/embroideryPositions/embroideryPosition.controller'
import { EmbroideryPositionService } from '~/serverSide/embroideryPositions/embroideryPosition.service'
import { embPosValidation } from '~/serverSide/embroideryPositions/embroideryPosition.validation'
import { ncConfig } from '~/serverSide/ErrorApi'

const controller = factoryEmbroideryPositionController(EmbroideryPositionService)

const handler = nc(ncConfig).use(authProtect).use(embPosValidation).get(controller.findOne).put(controller.update)

export default handler
