import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryPositionController } from '~/serverSide/embroideryPositions/embroideryPosition.controller'
import { EmbroideryPositionService } from '~/serverSide/embroideryPositions/embroideryPosition.service'
import { ncConfig } from '~/serverSide/ErrorApi'

const controller = factoryEmbroideryPositionController(EmbroideryPositionService)

const handler = nc(ncConfig).use(authProtect).get(controller.search)

export default handler
