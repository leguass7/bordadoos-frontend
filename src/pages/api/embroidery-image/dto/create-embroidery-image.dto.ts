import { EmbroideryImage } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator'

export class CreateEmbroideryFileDto implements Partial<EmbroideryImage> {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  size: number

  @IsNotEmpty()
  uri: string

  @IsOptional()
  createdBy: number
}

export class CreateEmbroideryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEmbroideryFileDto)
  files: CreateEmbroideryFileDto[]
}

export class CreateEmbroideryParamDto {
  @IsNumber()
  purchaseId: number
}
