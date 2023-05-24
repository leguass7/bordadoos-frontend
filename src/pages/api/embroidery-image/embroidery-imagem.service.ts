import { PrismaClient } from '@prisma/client'

import { CreateEmbroideryFileDto } from './dto/create-embroidery-image.dto'
import { FilterEmbroideryImageDto } from './dto/filter-embroidery-image.dto'

export class EmbroideryImageService {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(files: CreateEmbroideryFileDto[], purchaseId: number, createdBy: number) {
    const data = files.map(file => ({ ...file, purchaseId, createdBy, updatedBy: createdBy }))

    const image = await this.prismaService.embroideryImage.createMany({ data })
    return image
  }

  async list(filter: FilterEmbroideryImageDto) {
    const images = await this.prismaService.embroideryImage.findMany({ where: { ...filter, actived: true } })
    return images
  }

  async deleteImage(id: number, updatedBy: number) {
    const image = await this.prismaService.embroideryImage.update({
      data: { actived: false, updatedBy },
      where: { id }
    })
    return image
  }
}
