import { User } from '@prisma/client'

import type { IResponseApi } from '../api.interface'
import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'

export interface IResponseUserDto extends IResponseApi {
  userId?: number
  user?: User
}

export interface ICreateUserDto {
  id?: number
  name?: string
}

export interface IRequestCreateUserDto extends AuthorizedApiRequest {
  body: ICreateUserDto
}

export interface IRequestUserDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: { userId: number }
}
