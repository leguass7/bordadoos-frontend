import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { factoryUserController } from '~/serverSide/users/user.controller'
import { UserService } from '~/serverSide/users/user.service'

const controller = factoryUserController(UserService)

const handler = nc().use(authProtect)

export default handler
