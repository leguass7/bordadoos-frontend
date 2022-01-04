import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { preparePagination } from '~/serverSide/middlewares/paginate'
import { factoryUserController } from '~/serverSide/users/user.controller'
import { UserService } from '~/serverSide/users/user.service'
import { userValidation } from '~/serverSide/users/user.validation'

const controller = factoryUserController(UserService)

const handler = nc(ncConfig)
  .get(preparePagination, controller.paginate)
  .use(authProtect)
  .use(userValidation)
  .post(controller.create)

export default handler
