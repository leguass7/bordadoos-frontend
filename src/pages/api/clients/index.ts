import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryClientController } from '~/serverSide/clients/client.controller'
import { ClientService } from '~/serverSide/clients/client.service'
import { clientValidation } from '~/serverSide/clients/client.validation'
import { ncConfig } from '~/serverSide/ErrorApi'
import { preparePagination } from '~/serverSide/middlewares/paginate'

const controller = factoryClientController(ClientService)

const handler = nc(ncConfig)
  .use(authProtect)
  .use(clientValidation)
  .post(controller.create)
  .get(preparePagination, controller.paginate)

export default handler
