import type { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '~/serverSide/database/prisma'
import { UserService } from '~/serverSide/users/user.service'

const secret = process?.env?.NEXTAUTH_SECRET
const maxAge = 30 * 24 * 60 * 60 // 30 days

const options: NextAuthOptions = {
  debug: process.env.NODE_ENV !== 'production',
  secret,
  session: { maxAge, strategy: 'jwt' },
  callbacks: {
    async session({ session, token, user }) {
      const result: Session = { ...session }
      // @ts-ignore
      result.user.userId = parseInt(`${token.sub || 0}`)
      result.user.level = parseInt(`${token.level || 1}`)

      return result
    },
    async jwt({ token, account }) {
      const id = parseInt(`${token.sub || 0}`)
      const result = { ...token, id }

      if (id) {
        const user = await UserService.findOne({ id })
        result.level = user?.level
      }

      return result
    }
  },
  jwt: { secret, maxAge },
  adapter: PrismaAdapter(prisma),
  // @ts-ignore
  // adapter: CustomAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
      // authorizationUrl força o google a perguntar "qual conta usar" e renovar token
      // authorizationUrl:
      //   'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
      // scope: 'read:user user:email'
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

const authHandler: NextApiHandler = (req, res) => {
  // console.log('secret', secret)
  // console.log('\n', process.env.GOOGLE_ID, process.env.GOOGLE_SECRET, '\n')
  return NextAuth(req, res, options)
}
export default authHandler
