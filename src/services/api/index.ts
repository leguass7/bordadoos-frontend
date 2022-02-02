import axios from 'axios'

import { querystring } from '~/helpers/string'
import type { IClientFilter, IResponseClientsDto } from '~/serverSide/clients/client.dto'

import type { IResponseApi } from './api.types'
import { responseDto, responseError } from './utils'

const api = axios.create({
  baseURL: `/api`,
  withCredentials: true
})

api.interceptors.response.use(responseDto, responseError)

export { api }

export async function findCustomer(params: IClientFilter): Promise<IResponseClientsDto> {
  const query = `?${querystring(params)}`
  const response = await api.get<IResponseClientsDto>(`/clients/search${query}`)
  const data = response?.data
  return {
    success: !!data?.success,
    customers: data?.customers || []
  }
}
