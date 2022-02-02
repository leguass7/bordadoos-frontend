import { AxiosError, AxiosResponse } from 'axios'
import camelcaseKeys from 'camelcase-keys'

import type { IResponseApi } from './api.types'

export function responseDto(res: AxiosResponse): AxiosResponse {
  const axiosPayload = res && res?.data

  const data: IResponseApi = {
    ...axiosPayload,
    data: camelcaseKeys(axiosPayload, { deep: true })
  }

  return { ...res, data }
}

export function responseError(error?: AxiosError) {
  const response = error && error?.response
  const errorMessage = error ? `${error.code || error.message}` : 'timeout'

  const data: any = { success: false, message: errorMessage }
  if (!response) return Promise.resolve({ data })

  return Promise.resolve(response)
}
