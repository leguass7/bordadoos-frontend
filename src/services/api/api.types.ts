type ResponseApi = {
  success?: boolean
  statusCode?: number
  message?: string
}

export interface IResponsePaginate<T> extends ResponseApi {
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
