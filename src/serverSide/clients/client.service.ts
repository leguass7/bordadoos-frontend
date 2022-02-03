import { Prisma, Client } from '.prisma/client'

import prisma from '#server/database/prisma'
import { PaginationDto, PaginationQueryDto } from '#server/pagination/pagination.dto'
import { PrismaService } from '#server/pagination/pagination.service'

import type { IClientFilter, ICreateClientDto } from './client.dto'

import { isDefined } from '~/helpers/variables'

async function create(data: ICreateClientDto): Promise<Client> {
  try {
    const client = await prisma.client.create({ data })
    return client
  } catch {
    return null
  }
}

async function update(clientId: number, data: Partial<Client>): Promise<Client> {
  try {
    const client = await prisma.client.update({ data, where: { id: clientId } })
    return client
  } catch (error) {
    return null
  }
}

async function searchOne({ name, phone, id }: Partial<Client>): Promise<Client> {
  const client = await prisma.client.findFirst({
    where: { OR: [{ name }, { phone }, { id }] }
  })
  return client
}

async function findOne({ name, phone, id }: Partial<Client>): Promise<Client> {
  const client = await prisma.client.findFirst({
    where: { name, phone, id }
  })
  return client
}

async function deleteClient(clientId: number, userId?: number, force = false): Promise<boolean> {
  try {
    if (force) await prisma.client.delete({ where: { id: clientId } })
    else await prisma.client.update({ data: { actived: false, updatedBy: userId }, where: { id: clientId } })
    return true
  } catch {
    return false
  }
}

async function paginate(pagination: PaginationQueryDto, filter: IClientFilter = {}): Promise<PaginationDto<Client>> {
  const { search, actived } = filter
  const where: Prisma.ClientWhereInput = { id: { not: 0 }, actived: isDefined(actived) ? !!actived : undefined }

  if (search)
    where.AND = {
      OR: [
        { name: { contains: `${search}` } },
        { phone: { contains: `${search}` } },
        { doc: { contains: `${search}` } }
      ]
    }
  const clients = await PrismaService.paginate<Client>({
    model: 'Client',
    ...pagination,
    where
  })
  return clients
}

async function search(filter: IClientFilter = {}): Promise<Client[]> {
  const { search } = filter
  const where: Prisma.ClientWhereInput = { id: { not: 0 }, actived: true }

  if (search)
    where.AND = {
      OR: [
        { name: { contains: `${search}` } },
        { phone: { contains: `${search}` } },
        { doc: { contains: `${search}` } }
      ]
    }

  const clients = await prisma.client.findMany({ take: 10, where, orderBy: { name: 'asc' } })
  return clients
}

export const ClientService = {
  create,
  update,
  findOne,
  searchOne,
  paginate,
  deleteClient,
  search
}

export type IClientService = typeof ClientService
