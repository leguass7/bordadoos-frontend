import type { NextApiRequest, NextApiResponse } from 'next'

import ErrorApi from '../ErrorApi'
import { PaginationQueryDto } from '../pagination/pagination.dto'
import type {
  IRequestCreateClientDto,
  IRequestClientDto,
  IResponseClientDto,
  IResponsePaginateClientDto,
  IRequestUpdateClientDto
} from './client.dto'
import type { IClientService } from './client.service'

function create(clientService: IClientService) {
  return async (req: IRequestCreateClientDto, res: NextApiResponse) => {
    const { userId } = req.auth
    const { name, phone, doc } = req.body

    if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

    const hasClient = await clientService.findOne({ name, phone })
    if (hasClient) throw ErrorApi({ status: 400, message: 'client already exists' })

    await clientService.create({ name, phone, doc, actived: true, createdBy: userId })
    return res.status(201).json({ success: true })
  }
}

function update(clientService: IClientService) {
  return async (req: IRequestUpdateClientDto, res: NextApiResponse) => {
    const { query, body } = req
    const { userId } = req.auth

    const clientId = query?.clientId ? parseInt(query?.clientId) || 0 : 0
    if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

    await clientService.update(clientId, { ...body, updatedBy: userId })
    return res.status(201).json({ success: true })
  }
}

function findOne(clientService: IClientService) {
  return async (req: IRequestClientDto, res: NextApiResponse<IResponseClientDto>) => {
    const { query } = req
    const clientId = query?.clientId ? parseInt(query?.clientId) || 0 : 0
    const client = await clientService.findOne({ id: clientId })
    return res.status(201).json({ success: true, client })
  }
}

function paginate(clientService: IClientService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponsePaginateClientDto>) => {
    const { page, size, orderBy, order, ...filter } = req.query as PaginationQueryDto
    const paginateData = { page, size, orderBy, order }

    const { data, ...pagination } = await clientService.paginate(paginateData, filter)
    return res.status(200).json({ success: true, data, ...pagination })
  }
}

function remove(clientService: IClientService) {
  return async (req: IRequestClientDto, res: NextApiResponse<IResponseClientDto>) => {
    const { query } = req
    const { userId } = req.auth

    const clientId = query?.clientId ? parseInt(query.clientId) || 0 : 0
    if (!userId) throw ErrorApi({ status: 401, message: 'User not logged' })

    const success = await clientService.deleteClient(clientId, userId)

    return res.status(201).json({ success })
  }
}

export function factoryClientController(clientService: IClientService) {
  return {
    create: create(clientService),
    update: update(clientService),
    findOne: findOne(clientService),
    paginate: paginate(clientService),
    remove: remove(clientService)
  }
}