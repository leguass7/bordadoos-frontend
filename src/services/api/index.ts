import { Client } from '@prisma/client'
import axios from 'axios'

import { imageBase } from '~/config'
import { querystring } from '~/helpers/string'
import type { IClientFilter, IResponseClientsDto } from '~/serverSide/clients/client.dto'

export const Api = axios.create({
  baseURL: `${imageBase}/api`,
  withCredentials: true
})

export async function findCustomer(params: IClientFilter): Promise<IResponseClientsDto> {
  const query = `?${querystring(params)}`
  const response = await Api.get<Client[]>(`/clients/search${query}`)
  return {
    customers: response?.data
  }
}
