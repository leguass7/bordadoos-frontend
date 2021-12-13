import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryEmbroideryTypeController } from '~/serverSide/embroiderytypes/embroideryType.controller'
import { EmbroideryTypeService } from '~/serverSide/embroiderytypes/embroideryType.service'
import { ncConfig } from '~/serverSide/ErrorApi'
import { preparePagination } from '~/serverSide/middlewares/paginate'

const controller = factoryEmbroideryTypeController(EmbroideryTypeService)

const handler = nc(ncConfig).use(authProtect).get(preparePagination, controller.paginate)

export default handler
