import { FilterEmbroideryImageDto } from '~/pages/api/embroidery-image/dto/filter-embroidery-image.dto'

import { deleteDefault, getDefault, postDefault } from '.'

export interface CustomFile {
  uri?: string
  size?: number
  type?: string
  name?: string
}

export async function uploadEmbroideryImages(purchaseId: number, files: CustomFile[]) {
  const response = await postDefault(`/embroidery-image/${purchaseId}`, { files })
  return response
}

export async function listEmbroideryImages(filter: FilterEmbroideryImageDto) {
  const params = new URLSearchParams({ ...filter } as any)
  const query = params ? `?${params}` : ''

  const response = await getDefault(`/embroidery-image${query}`)
  return response
}

export async function deleteEmbroideryImage(imageId: number) {
  const response = await deleteDefault(`/embroidery-image/${imageId}`)
  return response
}
