import { celebrate, Joi, Segments } from 'celebrate'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import ErrorApi from '../ErrorApi'
import { IRequestCreateUserDto, IRequestUserDto } from './user.dto'

async function createValidation(req: IRequestCreateUserDto, res: NextApiResponse, next: NextHandler) {
  const { body } = req

  if (!Object.keys(body).length) throw ErrorApi({ status: 400, message: 'no body' })

  next()
}

async function getOneValidation(req: IRequestUserDto, res: NextApiResponse, next: NextHandler) {
  const { query } = req
  query.id = query.id ? parseInt(`${query?.id || 0}`) || 0 : 0

  if (!query.id) throw ErrorApi({ status: 400, message: 'invalid userId' })

  next()
}

export function userValidation(req: any, res: NextApiResponse, next: NextHandler) {
  const { method } = req
  if (method === 'POST') return createValidation(req, res, next)
  if (method === 'GET' || method === 'PUT' || method === 'DELETE') return getOneValidation(req, res, next)

  next()
}

export const getUserSchema = celebrate({
  [Segments.QUERY]: {
    userId: Joi.string().required().regex(/\d/)
  }
})
