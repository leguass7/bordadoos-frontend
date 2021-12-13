import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryClientController } from '~/serverSide/clients/client.controller'
import { ClientService } from '~/serverSide/clients/client.service'
import { clientValidation } from '~/serverSide/clients/client.validation'
import { ncConfig } from '~/serverSide/ErrorApi'

const controller = factoryClientController(ClientService)

const handler = nc(ncConfig)
  .use(authProtect)
  .use(clientValidation)
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.remove)

export default handler
