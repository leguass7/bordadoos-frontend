import nc from 'next-connect'

// import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { preparePagination } from '~/serverSide/middlewares/paginate'
import { factoryUserController } from '~/serverSide/users/user.controller'
import { UserService } from '~/serverSide/users/user.service'

const controller = factoryUserController(UserService)

const handler = nc(ncConfig)
  //.use(authProtect)
  .get(preparePagination, controller.paginate)
  .post(controller.create)

export default handler
