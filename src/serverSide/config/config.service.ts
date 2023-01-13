import prisma from '../database/prisma'
import ErrorApi from '../ErrorApi'
import { ConfigWithMeta, CreateConfigDTO } from './config.dto'

async function getOne<T>(key: string) {
  const config = await prisma.configuration.findUnique({ where: { key } })

  return config as ConfigWithMeta<T>
}

async function create(key: string, createConfigDTO: CreateConfigDTO) {
  const data = { ...createConfigDTO } as any
  const config = await prisma.configuration.upsert({
    where: { key },
    create: { key, ...data, actived: true },
    update: data
  })

  if (!config) throw ErrorApi('Error on create config')

  return config
}

export const configService = {
  create,
  getOne
}

export type IConfigService = typeof configService
