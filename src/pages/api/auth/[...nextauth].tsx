import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { Prisma } from 'next-auth/adapters'
import Providers from 'next-auth/providers'

import prisma from '~/serverSide/database/prisma'

const secret = process.env.SECRET

const options: NextAuthOptions = {
  secret,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async session(session, token) {
      const result: any = { ...session }
      result.user.userId = parseInt(`${token.sub || 0}`)
      return result
    }
  },
  jwt: { secret },
  adapter: Prisma.Adapter({ prisma }),
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // authorizationUrl força o google a perguntar "qual conta usar" e renovar token
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user user:email'
    })
    // https://github.com/nextauthjs/next-auth/blob/main/src/providers/instagram.js
    // Providers.Instagram({
    //   clientId: process.env.INSTAGRAM_CLIENT_ID,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    //   scope: 'user_profile,user_media',
    //   profileUrl: 'https://graph.instagram.com/me?fields=id,username,account_type,name,media_count,media'
    // }),
    // Providers.Credentials({
    //   name: 'credentials',
    //   credentials: {
    //     username: { label: 'e-mail', type: 'text' },
    //     password: { label: 'senha', type: 'password' }
    //   },
    //   authorize: emailAuthorizeDto
    // })
  ]

  // callbacks: {
  //   signIn: callbackSignin
  // }
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
