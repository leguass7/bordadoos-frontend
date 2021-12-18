import NextAuth from 'next-auth'

interface CustomUser {
  userId: string
  email: string
  name: string
  image?: string
}

declare module 'next-auth' {
  interface Session {
    user: CustomUser
  }
}
