import { EmbroideryImage } from '@prisma/client'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class FilterEmbroideryImageDto implements Partial<EmbroideryImage> {
  @IsOptional()
  @IsNumber()
  purchaseId?: number

  @IsOptional()
  @IsNumber()
  createdBy?: number

  @IsOptional()
  @IsDate()
  createdAt?: Date

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsNumber()
  size?: number

  @IsOptional()
  @IsString()
  name?: string
}
