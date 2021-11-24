import type { IResponseApi } from '../api.interface'
import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'

export interface IResponseUserDto extends IResponseApi {
  userId?: number
}

export interface ICreateUserDto {
  id?: number
  name?: string
}

export interface IRequestCreateUserDto extends AuthorizedApiRequest {
  body: ICreateUserDto
}
