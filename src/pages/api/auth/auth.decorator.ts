import { createParamDecorator } from 'next-api-decorators'

import { AuthorizedApiRequest } from './auth.dto'

export const ReqAuth = createParamDecorator((req: AuthorizedApiRequest) => {
  const auth = { ...req.auth }
  if (auth.userId) auth.userId = parseInt(`${auth.userId}`)
  return auth
})
