import { toast } from 'react-toastify'

import { AxiosError, AxiosResponse } from 'axios'

import { ResponseApi } from '.'

export function responseDto(res: AxiosResponse): AxiosResponse {
  const axiosData = res && res?.data
  const success = !!(res?.status < 400)

  const data: ResponseApi = {
    ...axiosData,
    success
    // ...camelcaseKeys(axiosData, { deep: true })
  }

  if (success && axiosData?.message) toast(axiosData.message, { type: 'success' })

  return { ...res, data }
}

export function responseError(error?: AxiosError) {
  const response = error && error?.response
  // const errorMessage = error ? `${error.code || error.message}` : 'timeout'
  const errorMessage = response ? `${response?.data?.message || error?.message}` : 'timeout'

  toast(errorMessage, { type: 'error' })

  const data: any = { success: false, message: errorMessage }
  if (!response) return Promise.resolve({ data })

  return Promise.resolve(response)
}
