// import { errors } from 'celebrate'
import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { factoryUserController } from '~/serverSide/users/user.controller'
import { UserService } from '~/serverSide/users/user.service'
import { getUserSchema } from '~/serverSide/users/user.validation'

const controller = factoryUserController(UserService)

const handler = nc(ncConfig)
  .use(authProtect) //
  .use()
  .use(getUserSchema)
  .get(controller.findOne)

export default handler
