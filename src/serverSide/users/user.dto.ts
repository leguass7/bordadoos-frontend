import { User } from '@prisma/client'

import type { IResponseApi } from '../api.interface'
import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import { PaginationQueryDto } from '../pagination/pagination.dto'

export interface IResponsePaginateUserDto extends IResponseApi {
  data: User[]
}

export interface IResponseUserDto extends IResponseApi {
  userId?: number
  user?: User
}

export interface ICreateUserDto extends Partial<User> {}

export interface IUserFilter {
  search?: string
  actived?: boolean
}

export type IPaginateUserDTO = PaginationQueryDto & IUserFilter

export interface IRequestPaginateUserDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: IPaginateUserDTO
}

export interface IRequestCreateUserDto extends AuthorizedApiRequest {
  body: ICreateUserDto
}

export interface IRequestUpdateUserDto extends AuthorizedApiRequest {
  body: Partial<ICreateUserDto>
  query: { userId: string }
}

export interface IRequestUserDto extends Omit<AuthorizedApiRequest, 'query'> {
  query: Partial<User> & { userId: number }
}
