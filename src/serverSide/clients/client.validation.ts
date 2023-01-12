import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import { celebrate, Joi, Segments } from 'celebrate'

import { isDefined } from '~/helpers/variables'

import ErrorApi from '../ErrorApi'
import { IRequestCreateClientDto, IRequestPaginateClientDto } from './client.dto'

async function createValidation(req: IRequestCreateClientDto, res: NextApiResponse, next: NextHandler) {
  const { body } = req

  if (!Object.keys(body).length) throw ErrorApi({ status: 400, message: 'no body' })

  next()
}

async function paginateValidation(req: IRequestPaginateClientDto, res: NextApiResponse, next: NextHandler) {
  const { query } = req

  if (isDefined(query.actived)) query.actived = !!(`${query.actived}` === 'true')

  next()
}

export function clientValidation(req: any, res: NextApiResponse, next: NextHandler) {
  const { method } = req
  if (method === 'POST') return createValidation(req, res, next)
  if (method === 'GET') return paginateValidation(req, res, next)

  next()
}

export const getClientSchema = celebrate({
  [Segments.QUERY]: {
    clientId: Joi.string().required().regex(/\d/)
  }
})
