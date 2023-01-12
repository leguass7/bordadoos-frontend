// import type { Adapter, AdapterAccount } from 'next-auth/adapters'

// import type { PrismaClient, Prisma, User, Account } from '@prisma/client'

// export function CustomAdapter(p: PrismaClient) {
//   return {
//     createUser: (data: User) => p.user.create({ data }),
//     getUser: id => p.user.findUnique({ where: { id } }),
//     getUserByEmail: email => p.user.findUnique({ where: { email } }),
//     async getUserByAccount(provider: Account) {
//       const account = await p.account.findFirst({
//         where: { providerAccountId: provider.providerAccountId, providerId: provider?.providerId },
//         select: { user: true }
//       })
//       return account?.user ?? null
//     },
//     updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
//     deleteUser: id => p.user.delete({ where: { id } }),
//     linkAccount: data => p.account.create({ data }) as unknown as AdapterAccount,
//     unlinkAccount: (providerAccountId: string) =>
//       p.account.delete({
//         where: { providerAccountId }
//       }) as unknown as AdapterAccount,
//     async getSessionAndUser(sessionToken) {
//       const userAndSession = await p.session.findUnique({
//         where: { sessionToken },
//         include: { user: true }
//       })
//       if (!userAndSession) return null
//       const { user, ...session } = userAndSession
//       return { user, session }
//     },
//     createSession: data => p.session.create({ data }),
//     updateSession: data => p.session.update({ where: { sessionToken: data.sessionToken }, data }),
//     deleteSession: sessionToken => p.session.delete({ where: { sessionToken } }),
//     async createVerificationToken(data) {
//       const verificationToken = await p.verificationRequest.create({ data })
//       // @ts-ignore // MongoDB needs an ID, but we don't
//       if (verificationToken.id) delete verificationToken.id
//       return verificationToken
//     },
//     async useVerificationToken(identifier) {
//       try {
//         const verificationToken = await p.verificationRequest.delete({
//           where: { identifier }
//         })
//         // @ts-ignore // MongoDB needs an ID, but we don't
//         if (verificationToken.id) delete verificationToken.id
//         return verificationToken
//       } catch (error) {
//         // If token already used/deleted, just return null
//         // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
//         if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025') return null
//         throw error
//       }
//     }
//   }
// }

export {}
