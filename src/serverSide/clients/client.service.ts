import { Prisma, Client } from '.prisma/client'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { IClientFilter, ICreateClientDto } from './client.dto'

async function create(data: ICreateClientDto): Promise<number> {
  const client = await prisma.client.create({ data })
  return client && client.id
}

async function update(clientId: number, data: Partial<Client>): Promise<number> {
  const client = await prisma.client.update({ data, where: { id: clientId } })
  return client && client.id
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
  } catch (err) {
    console.log(err)
    return false
  }
}

async function paginate(pagination: PaginationQueryDto, filter: IClientFilter = {}): Promise<PaginationDto<Client>> {
  const { search, actived } = filter
  const where: Prisma.ClientWhereInput = { id: { not: 0 }, actived }

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

export const ClientService = {
  create,
  update,
  findOne,
  searchOne,
  paginate,
  deleteClient
}

export type IClientService = typeof ClientService
