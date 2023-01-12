export interface IResponseApi {
  success?: boolean
  message?: string | string[]
}

export interface NewResponseApi<T = any> extends IResponseApi {
  data?: T
}
