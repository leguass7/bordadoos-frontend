import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryTypeController } from '~/serverSide/embroiderytypes/embroideryType.controller'
import { EmbroideryTypeService } from '~/serverSide/embroiderytypes/embroideryType.service'
import { embtypeValidation } from '~/serverSide/embroiderytypes/embroideryType.validation'
import { ncConfig } from '~/serverSide/ErrorApi'

const controller = factoryEmbroideryTypeController(EmbroideryTypeService)

const handler = nc(ncConfig).use(authProtect).use(embtypeValidation).get(controller.findOne).put(controller.update)

export default handler
