// import { errors } from 'celebrate'
import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { factoryUserController } from '~/serverSide/users/user.controller'
import { UserService } from '~/serverSide/users/user.service'
import { getUserSchema, userValidation } from '~/serverSide/users/user.validation'

const controller = factoryUserController(UserService)

const handler = nc(ncConfig).use(authProtect).use(getUserSchema).get(userValidation, controller.findOne)

export default handler
