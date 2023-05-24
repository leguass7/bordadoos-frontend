import { Prisma, PrismaClient } from '@prisma/client'

import { CreateEmbroideryFileDto } from './dto/create-embroidery-image.dto'
import { FilterEmbroideryImageDto } from './dto/filter-embroidery-image.dto'

export class EmbroideryImageService {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(files: CreateEmbroideryFileDto[], purchaseId: number, createdBy: number) {
    const data = files.map(file => ({ ...file, createdBy, updatedBy: createdBy }))

    const images = await Promise.all(
      data.map(d =>
        this.prismaService.embroideryImage.create({ data: { ...d, purchases: { connect: { id: purchaseId } } } })
      )
    )

    return images
  }

  async list({ purchaseId, ...filter }: FilterEmbroideryImageDto) {
    const where: Prisma.EmbroideryImageWhereInput = { ...filter, actived: true }
    if (purchaseId) where.purchases = { every: { id: purchaseId } }

    const images = await this.prismaService.embroideryImage.findMany({ where })
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
