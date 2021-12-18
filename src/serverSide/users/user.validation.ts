import { User } from '@prisma/client'
import { celebrate, Joi, Segments } from 'celebrate'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import { removeInvalidValues } from '~/helpers/object'

import ErrorApi from '../ErrorApi'
import { IRequestCreateUserDto, IRequestUserDto } from './user.dto'

async function createValidation(req: IRequestCreateUserDto, res: NextApiResponse, next: NextHandler) {
  const { body } = req

  if (!Object.keys(body).length) throw ErrorApi({ status: 400, message: 'no body' })

  next()
}

async function getOneValidation(req: IRequestUserDto, res: NextApiResponse, next: NextHandler) {
  let { userId, name = null, email = null, cellPhone = null, cpf = null } = req.query

  userId = userId ? parseInt(`${userId || 0}`) || 0 : 0
  let result: IRequestUserDto['query'] = { userId }

  if (!userId && !name && !email && !cellPhone && !cpf) throw ErrorApi({ status: 400, message: 'invalid filter' })

  result = removeInvalidValues({ ...result, name, email, cellPhone, cpf })
  req.query = result

  next()
}

async function updateValidation(req: IRequestUserDto, res: NextApiResponse, next: NextHandler) {
  const { query } = req
  query.userId = query.userId ? parseInt(`${query?.userId || 0}`) || 0 : 0

  if (!query.userId) throw ErrorApi({ status: 400, message: 'invalid userId' })

  next()
}

export function userValidation(req: any, res: NextApiResponse, next: NextHandler) {
  const { method } = req
  if (method === 'POST') return createValidation(req, res, next)
  if (method === 'GET') return getOneValidation(req, res, next)
  if (method === 'PUT' || method === 'DELETE') return updateValidation(req, res, next)

  next()
}

export const getUserSchema = celebrate({
  [Segments.QUERY]: {
    userId: Joi.string().required().regex(/\d/)
  }
})
