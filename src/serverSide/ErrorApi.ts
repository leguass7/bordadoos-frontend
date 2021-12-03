import { isCelebrateError, errors } from 'celebrate'
import { NextApiResponse, NextApiRequest } from 'next'
import { Options } from 'next-connect'

export interface ApiErrorParam {
  status: number
  message: string | string[]
}

/** @type {TypeError} */
export default function ErrorApi(data: ApiErrorParam | string) {
  if (typeof data === 'string') return TypeError(JSON.stringify({ message: data }))
  return TypeError(JSON.stringify(data))
}

export function onErrorApi(err: any, req: NextApiRequest, res: NextApiResponse) {
  try {
    if (isCelebrateError(err)) {
      return errors()
    }
    const errorObject = JSON.parse(err.message)
    return res
      .status(errorObject?.status || 500)
      .json({ success: false, message: errorObject?.message || 'unexpected error' })
  } catch (error) {
    return res.status(500).json({ success: false, message: err?.message || 'catch unexpected error' })
  }
}

export const ncConfig: Options<NextApiRequest, NextApiResponse> = {
  onError: onErrorApi
}
