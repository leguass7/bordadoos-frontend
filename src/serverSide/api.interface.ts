import { NextApiResponse } from 'next'

export interface IResponseApi extends NextApiResponse {
  success?: boolean
  message?: string | string[]
}
