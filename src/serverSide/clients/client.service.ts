import { Client } from '.prisma/client'

import prisma from '../database/prisma'
import { PaginationDto, PaginationQueryDto } from '../pagination/pagination.dto'
import { PrismaService } from '../pagination/pagination.service'
import type { ICreateClientDto } from './client.dto'

async function create(data: ICreateClientDto): Promise<number> {
  const client = await prisma.client.create({ data })
  return client && client.id
}

async function update(clientId: number, data: Partial<ICreateClientDto>): Promise<number> {
  const client = await prisma.client.update({ data, where: { id: clientId } })
  return client && client.id
}

async function findOne({ name, phone, id }: Partial<Client>): Promise<Client> {
  const client = await prisma.client.findFirst({
    where: { OR: [{ name }, { phone }, { id }] }
  })
  return client
}

async function deleteClient(clientId: number, force = false): Promise<boolean> {
  try {
    if (force) await prisma.client.delete({ where: { id: clientId } })
    else await prisma.client.update({ data: { actived: false }, where: { id: clientId } })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function paginate(pagination: PaginationQueryDto, filter: Partial<Client> = {}): Promise<PaginationDto<Client>> {
  const clients = await PrismaService.paginate<Client>({
    model: 'Client',
    ...pagination,
    where: { ...filter }
  })
  return clients
}

export const ClientService = {
  create,
  update,
  findOne,
  paginate,
  deleteClient
}

export type IClientService = typeof ClientService
