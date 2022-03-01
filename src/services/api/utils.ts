import { AxiosError, AxiosResponse } from 'axios'

import { ResponseApi } from '.'

export function responseDto(res: AxiosResponse): AxiosResponse {
  const axiosData = res && res?.data

  const data: ResponseApi = {
    ...axiosData,
    success: !!(res?.status < 400)
    // ...camelcaseKeys(axiosData, { deep: true })
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
