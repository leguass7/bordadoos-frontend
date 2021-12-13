import { celebrate, Joi, Segments } from 'celebrate'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import ErrorApi from '../ErrorApi'
import { IEmbTypeDTO, IRequestCreateEmbtypeDto, IRequestEmbroideryType } from './embroideryType.dto'

async function createValidation(req: IRequestCreateEmbtypeDto, res: NextApiResponse, next: NextHandler) {
  const { label = null, description = null, actived = false, image = null } = req.body
  const { userId } = req.auth

  let result = {}

  if (!label) throw ErrorApi({ status: 400, message: 'embroidery type needs a label' })
  if (!description) throw ErrorApi({ status: 400, message: 'embroidery type needs a description' })
  if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

  result = { label, description, actived, image }
  req.body = result as IEmbTypeDTO

  next()
}

async function getOneValidation(req: IRequestEmbroideryType, res: NextApiResponse, next: NextHandler) {
  const { query } = req
  query.embTypeId = query.embTypeId ? parseInt(`${query?.embTypeId || 0}`) || 0 : 0

  if (!query.embTypeId) throw ErrorApi({ status: 400, message: 'invalid id' })

  next()
}

export function embtypeValidation(req: any, res: NextApiResponse, next: NextHandler) {
  const { method } = req
  if (method === 'POST') return createValidation(req, res, next)
  if (method === 'GET' || method === 'PUT' || method === 'DELETE') return getOneValidation(req, res, next)

  next()
}

export const getEmbroiderytypeSchema = celebrate({
  [Segments.QUERY]: {
    embTypeId: Joi.string().required().regex(/\d/)
  }
})
