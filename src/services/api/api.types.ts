import type { IResponseApi } from '#server/api.interface'

export type { IResponseApi }
export interface IResponsePaginate<T> extends IResponseApi {
  pages: number
  page: number
  total: number
  data: T[]
}

export interface IPagination {
  page: number
  total?: number
  size?: number
}
