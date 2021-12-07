import { User } from '@prisma/client'

const password = 'e10adc3949ba59abbe56e057f20f883e'

export const users: Partial<User>[] = [
  { email: 'leandro.sbrissa@hotmail.com', name: 'Leandro', password, level: 9, actived: true },
  { email: 'emanuelsevero869@gmail.com', name: 'Emanuel', password, level: 9, actived: true }
]
