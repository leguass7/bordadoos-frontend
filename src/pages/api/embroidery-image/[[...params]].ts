import {
  BadRequestException,
  Body,
  createHandler,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe
} from 'next-api-decorators'

import prisma from '~/serverSide/database/prisma'

import { ReqAuth } from '../auth/auth.decorator'
import type { IAuthorizedUser } from '../auth/auth.dto'
import { JwtAuthGuard } from '../auth/auth.middleware'
import { CreateEmbroideryDto } from './dto/create-embroidery-image.dto'
import { FilterEmbroideryImageDto } from './dto/filter-embroidery-image.dto'
import { EmbroideryImageService } from './embroidery-imagem.service'

const Pipe = ValidationPipe({ whitelist: true })

class EmbroideryImageController {
  private embroideryImageService: EmbroideryImageService

  constructor() {
    this.embroideryImageService = new EmbroideryImageService(prisma)
  }

  @Get()
  @JwtAuthGuard()
  async list(@Query(Pipe) filter: FilterEmbroideryImageDto) {
    const images = await this.embroideryImageService.list(filter)
    return { data: images }
  }

  @JwtAuthGuard()
  @Post('/:purchaseId/:duplicated')
  async addDuplicated(
    @Param('purchaseId') param: string,
    @Param('duplicated') duplicatedParam: string,
    @ReqAuth() auth: IAuthorizedUser
  ) {
    const duplicated = parseInt(duplicatedParam)
    const purchaseId = parseInt(param)

    if (typeof purchaseId !== 'number' || typeof duplicated !== 'number')
      throw new BadRequestException('Purchase not found')

    // Get images from duplicated purchase
    const images = await this.embroideryImageService.list({ purchaseId: duplicated })

    const dto = images.map(img => {
      return { ...img, createdAt: undefined, updatedAt: undefined, id: undefined }
    })

    const data = await this.embroideryImageService.create(dto, purchaseId, auth.userId)

    return { data }
  }

  @JwtAuthGuard()
  @Post('/:purchaseId')
  async upload(
    @Param('purchaseId') param: string,
    @ReqAuth() auth: IAuthorizedUser,
    @Body(Pipe) { files }: CreateEmbroideryDto
  ) {
    const purchaseId = parseInt(param)
    if (typeof purchaseId !== 'number') throw new BadRequestException('Purchase not found')

    const data = await this.embroideryImageService.create(files, purchaseId, auth.userId)
    const isMany = data?.length > 1

    return { data, message: `Sucesso no upload ${isMany ? 'das imagens' : 'da imagem'}` }
  }

  @JwtAuthGuard()
  @Delete('/:id')
  async deleteImage(@Param('id') param: string, @ReqAuth() auth: IAuthorizedUser) {
    const id = parseInt(param)
    if (typeof id !== 'number') throw new BadRequestException('Image not found')

    const data = await this.embroideryImageService.deleteImage(id, auth.userId)

    return { data }
  }
}

export default createHandler(EmbroideryImageController)
