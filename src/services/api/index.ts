import type { Client } from '@prisma/client'
import axios from 'axios'

import { querystring } from '~/helpers/string'
import type { IClientFilter, IResponseClientDto, IResponseClientsDto } from '~/serverSide/clients/client.dto'

import { responseDto, responseError } from './utils'

const api = axios.create({
  baseURL: `/api`,
  withCredentials: true
})

api.interceptors.response.use(responseDto, responseError)

export { api }

export async function findAllCustomers(params: IClientFilter): Promise<IResponseClientsDto> {
  const query = `?${querystring(params)}`
  const response = await api.get<IResponseClientsDto>(`/clients/search${query}`)
  const data = response?.data
  return {
    success: !!data?.success,
    customers: data?.customers || []
  }
}

export async function getCustomer(customerId: number): Promise<IResponseClientDto> {
  const response = await api.get<IResponseClientDto>(`/clients/${customerId}`)
  const data = response?.data
  return {
    success: !!data?.success,
    client: data?.client
  }
}

export async function storeCustomer(formData: Partial<Client>): Promise<IResponseClientDto> {
  const { id: clientId } = formData
  const action = clientId ? api.put : api.post
  const url = `/clients${clientId ? `/${clientId}` : ``}`
  const response = await action<IResponseClientDto>(url, formData)
  const data = response?.data
  return {
    success: !!data?.success,
    client: data?.client,
    clientId: data?.client?.id
  }
}
