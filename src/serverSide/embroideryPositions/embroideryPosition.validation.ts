import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import ErrorApi from '../ErrorApi'
import { IEmbPosDTO, IRequestCreateEmbPos, IRequestEmbPos } from './EmbroideryPosition.dto'

async function createValidation(req: IRequestCreateEmbPos, res: NextApiResponse, next: NextHandler) {
  const { label = null, description = null, actived = false, image = null, embType } = req.body
  const { userId } = req.auth

  let result = {}

  if (!label) throw ErrorApi({ status: 400, message: 'embroidery type must have a label' })
  if (!embType) throw ErrorApi({ status: 401, message: 'embroidery position must have an embroidery type' })
  if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

  result = { label, actived, image, embType, description }
  req.body = result as IEmbPosDTO

  next()
}

async function getOneValidation(req: IRequestEmbPos, res: NextApiResponse, next: NextHandler) {
  const { query } = req
  const { userId } = req.auth

  query.embPosId = query.embPosId ? parseInt(`${query?.embPosId || 0}`) || 0 : 0

  if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })
  if (!query.embPosId) throw ErrorApi({ status: 400, message: 'invalid id' })

  next()
}

export function embPosValidation(req: any, res: NextApiResponse, next: NextHandler) {
  const { method } = req
  if (method === 'POST') return createValidation(req, res, next)
  if (method === 'GET' || method === 'PUT' || method === 'DELETE') return getOneValidation(req, res, next)

  next()
}
