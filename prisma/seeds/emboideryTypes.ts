import { EmbroideryType, EmbroideryPosition } from '@prisma/client'

export const embroideryTypes: Partial<EmbroideryType>[] = [
  { id: 1, label: 'Camisa', actived: true },
  { id: 2, label: 'Manga', actived: true },
  { id: 3, label: 'Bolso', actived: true },
  { id: 4, label: 'Boné', actived: true }
  // ...
]

export const embroideryPositions: Partial<EmbroideryPosition>[] = [
  { id: 11, embType: 1, label: 'Peito direito', actived: true },
  { id: 12, embType: 1, label: 'Peito esquerdo', actived: true },
  { id: 13, embType: 1, label: 'Costa', actived: true },
  // ...
  { id: 21, embType: 2, label: 'Central', actived: true },
  // ...
  { id: 31, embType: 3, label: 'Central', actived: true },
  // ...
  { id: 41, embType: 4, label: 'Frente', actived: true },
  { id: 42, embType: 4, label: 'Costa', actived: true },
  { id: 43, embType: 4, label: 'Direito', actived: true },
  { id: 44, embType: 4, label: 'Esquesdo', actived: true }
]
