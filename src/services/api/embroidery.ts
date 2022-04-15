import { EmbroideryPosition } from '@prisma/client'

import { getDefault, ResponseApi } from '.'

export async function getPositionByType(typeId: number): Promise<ResponseApi<{ positions?: EmbroideryPosition[] }>> {
  if (typeId && !isNaN(typeId)) {
    const response = await getDefault<{ positions: EmbroideryPosition[] }>(
      `/embroidery/positions/search?typeId=${typeId}`
    )
    return response
  }
  return { success: false }
}
