import { memo } from 'react'

import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { EmbroideryType } from '@prisma/client'

import { Text } from '~/components/styled'
import { formatDate } from '~/helpers/string'

import { ItemContainer, ItemDescription, ItemTitle } from '../styles'

interface Props extends EmbroideryType {
  onSelect: (_typeId: number, label?: string) => void
  selectedId?: number
}

const TypeFoundComponent: React.FC<Props> = ({ onSelect, selectedId, id, label, description, createdAt }) => {
  const handleClick = () => {
    if (onSelect) onSelect(id, label)
  }

  return (
    <ItemContainer onClick={handleClick} actived={!!(selectedId === id)}>
      <ItemTitle>{label}</ItemTitle>
      <ItemDescription>
        <Text size={12}>{description || formatDate(createdAt, 'dd/MM/yyyy') || `ID: ${id}`}</Text>
        {onSelect && <ArrowRightIcon fontSize="small" />}
      </ItemDescription>
    </ItemContainer>
  )
}

export const TypeFound = memo(TypeFoundComponent)
