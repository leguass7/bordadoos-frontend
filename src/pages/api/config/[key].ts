import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryConfigController } from '~/serverSide/config/config.controller'
import { configService } from '~/serverSide/config/config.service'
import { getConfigSchema, saveConfigSchema } from '~/serverSide/config/config.validation'
import { ncConfig } from '~/serverSide/ErrorApi'

const controller = factoryConfigController(configService)

const handler = nc(ncConfig)
  .use(authProtect)
  .post(saveConfigSchema, controller.save)
  .get(getConfigSchema, controller.findOne)

export default handler
