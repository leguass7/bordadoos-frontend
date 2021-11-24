/**
 * PrismaClient is attached to the `global` object in development to prevent
 * exhausting your database connection limit.
 * Learn more: https://pris.ly/d/help/next-js-best-practices
 */

import { PrismaClient } from '@prisma/client'

// import withCache from './cache'

declare let global: NodeJS.Global & typeof globalThis

let prisma: PrismaClient

function createPrisma(): PrismaClient {
  const newPrisma = new PrismaClient({
    log: [
      // { emit: 'stdout', level: 'query' }
      // { emit: 'stdout', level: 'error' },
      // { emit: 'stdout', level: 'info' },
      // { emit: 'stdout', level: 'warn' }
    ]
  })

  // newPrisma.$on('query', e => {
  //   console.log('Query: ' + e.query)
  //   console.log('Duration: ' + e.duration + 'ms')
  // })
  return newPrisma
}

if (process.env.NODE_ENV === 'production') {
  prisma = createPrisma()
} else {
  if (!global.prisma) {
    global.prisma = createPrisma()
  }
  prisma = global.prisma
}

export default prisma
