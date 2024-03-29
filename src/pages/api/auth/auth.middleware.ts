import type { NextApiResponse } from 'next'
import { createMiddlewareDecorator, NextFunction, UnauthorizedException } from 'next-api-decorators'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { parse } from 'next-useragent'

import { saltKey as secret } from '~/config'
import { makeArray } from '~/helpers/array'

import type { AuthorizedApiRequest } from './auth.dto'
import { authorizedDto } from './auth.helper'

export const JwtAuthGuard = createMiddlewareDecorator(
  async (req: AuthorizedApiRequest, res: NextApiResponse, next: NextFunction) => {
    const unauthorize = (msg = 'unauthorized') => {
      return next(new UnauthorizedException(msg))
    }

    try {
      // // console.log('secret', secret, process.env.NEXTAUTH_URL, process.env.VERCEL_URL)
      let session: any = await getToken({ req, secret })
      // console.log('session token', session)
      if (!session) {
        session = await getSession({ req })
        // console.log('session session', session)
        if (!session) {
          return unauthorize()
        }
      }

      req.auth = authorizedDto(session)
      req.ua = req?.headers['user-agent'] ? parse(req.headers['user-agent']) : null
      if (!req.auth?.userId) return unauthorize()

      next()
    } catch (error) {
      return unauthorize()
    }
  }
)

export const IfAuth = createMiddlewareDecorator(
  async (req: AuthorizedApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      let session: any = await getToken({ req, secret })
      if (!session) {
        session = await getSession({ req })
      }

      req.auth = session ? authorizedDto(session) : null
      req.ua = req?.headers['user-agent'] ? parse(req.headers['user-agent']) : null

      next()
    } catch (error) {
      next()
    }
  }
)

export const AdminAuth = (levels: number[] | number) =>
  createMiddlewareDecorator(async (req: AuthorizedApiRequest, res: NextApiResponse, next: NextFunction) => {
    const unauthorize = (msg = 'unauthorized') => next(new UnauthorizedException(msg))
    try {
      let session: any = await getToken({ req, secret })
      if (!session) {
        session = await getSession({ req })
      }

      req.auth = session ? authorizedDto(session) : null
      req.ua = req?.headers['user-agent'] ? parse(req.headers['user-agent']) : null

      if (!req?.auth?.level || !makeArray(levels).includes(req.auth.level)) return unauthorize()

      next()
    } catch (error) {
      unauthorize()
    }
  })
