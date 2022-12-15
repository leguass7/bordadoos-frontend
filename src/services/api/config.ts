import { IResponseFindConfig } from '~/serverSide/config/config.dto'

import { api } from '.'

export async function getConfig(key: string): Promise<IResponseFindConfig> {
  const response = await api.get(`/config/${key}`)
  return response?.data
}

export async function saveConfig(key: string, data: Record<string, any>) {
  const response = await api.post(`/config/${key}`, data)
  return response?.data
}
