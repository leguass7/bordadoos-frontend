import 'next-auth/jwt'
import { DefaultJWT } from 'next-auth/jwt'

interface CustomJWT extends DefaultJWT {
  level?: number
}

declare module 'next-auth/jwt' {
  export interface JWT extends CustomJWT {}
}
