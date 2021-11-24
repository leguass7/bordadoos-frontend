import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { NextHandler } from 'next-connect'

import { saltKey } from '~/config'

export interface IAuthorizedUser {
  userId: number
  name: string
  email?: string
}

export interface AuthorizedApiRequest extends NextApiRequest {
  auth: IAuthorizedUser
}

function authorizedDto(data: JWT): IAuthorizedUser {
  return {
    userId: (data?.sub && parseInt(data?.sub, 10)) || 0,
    name: data?.name || '',
    email: data?.email || ''
  }
}

export async function authProtect(req: AuthorizedApiRequest, res: NextApiResponse, next: NextHandler) {
  const unauthorize = (msg?: string) => res.status(401).json({ message: msg || 'não autorizado' })
  try {
    const session = await getToken({ req, secret: saltKey })
    if (!session) {
      return unauthorize()
    }
    req.auth = authorizedDto(session)
    next()
  } catch (error) {
    return unauthorize()
  }
}
