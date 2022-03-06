import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryTypeController } from '~/serverSide/embroideryTypes/embroideryType.controller'
import { EmbroideryTypeService } from '~/serverSide/embroideryTypes/embroideryType.service'
import { ncConfig } from '~/serverSide/ErrorApi'

const controller = factoryEmbroideryTypeController(EmbroideryTypeService)

const handler = nc(ncConfig).use(authProtect).get(controller.search)

export default handler
