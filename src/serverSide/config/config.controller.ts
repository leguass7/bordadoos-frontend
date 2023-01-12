import type { NextApiResponse } from 'next'

import { IRequestConfigFilter, IRequestSaveConfigDTO } from './config.dto'
import { IConfigService } from './config.service'

function findOne(configService: IConfigService) {
  return async (req: IRequestConfigFilter, res: NextApiResponse) => {
    const { key } = req.query
    const data = await configService.getOne(key)

    return res.status(200).json({ success: true, data })
  }
}

function save(configService: IConfigService) {
  return async (req: IRequestSaveConfigDTO, res: NextApiResponse) => {
    const { userId } = req.auth

    const data = await configService.create(req.query?.key, {
      updatedBy: userId,
      meta: req.body
    })

    return res.status(201).json({ success: true, data, message: 'Configurações atualizas com êxito' })
  }
}

export function factoryConfigController(userService: IConfigService) {
  return {
    save: save(userService),
    findOne: findOne(userService)
  }
}
