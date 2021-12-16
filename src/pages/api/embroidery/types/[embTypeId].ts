import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryTypeController } from '~/serverSide/embroideryTypes/embroideryType.controller'
import { EmbroideryTypeService } from '~/serverSide/embroideryTypes/embroideryType.service'
import { embtypeValidation } from '~/serverSide/embroideryTypes/embroideryType.validation'
import { ncConfig } from '~/serverSide/ErrorApi'

const controller = factoryEmbroideryTypeController(EmbroideryTypeService)

const handler = nc(ncConfig).use(authProtect).use(embtypeValidation).get(controller.findOne).put(controller.update)

export default handler
