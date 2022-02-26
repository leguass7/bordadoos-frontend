import axios, { AxiosRequestConfig } from 'axios'

import { normalizeUrl } from '~/helpers/string'

import { responseDto, responseError } from './utils'

const api = axios.create({
  baseURL: `/api`,
  withCredentials: true
})

api.interceptors.response.use(responseDto, responseError)

export { api }

export type ResponseApi<T = any> = T & {
  success?: boolean
  message?: string | string[]
}

export async function getDefault<T = any>(path?: string, config?: AxiosRequestConfig): Promise<ResponseApi<T>> {
  const url = normalizeUrl(path)
  const response = await api.get(url, config)
  return response && response.data
}

export async function postDefault<T = any, P = any>(
  path: string,
  payload: P,
  config?: AxiosRequestConfig
): Promise<ResponseApi<T>> {
  const url = normalizeUrl(path)
  const response = await api.post(url, payload, config)

  return response && response.data
}

export async function putDefault<T = any, P = any>(
  path: string,
  payload: P,
  config?: AxiosRequestConfig
): Promise<ResponseApi<T>> {
  const url = normalizeUrl(path)
  const response = await api.put(url, payload, config)

  return response && response.data && response.data
}

export async function deleteDefault<T = any>(path: string, config?: AxiosRequestConfig): Promise<ResponseApi<T>> {
  const url = normalizeUrl(path)
  const response = await api.delete(url, config)
  return response && response.data
}
