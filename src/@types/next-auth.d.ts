import NextAuth from 'next-auth'

interface CustomUser {
  userId: string
  level: number
  email: string
  name: string
  image?: string
}

declare module 'next-auth' {
  interface Session {
    user: CustomUser
  }
}
