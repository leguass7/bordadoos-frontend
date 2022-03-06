import React, { memo } from 'react'

import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import type { Client } from '@prisma/client'

import { Text } from '~/components/styled'

import { ItemContainer, ItemTitle, ItemDescription } from '../styles'

export type SearchCustomerSelectHandler = (customerId?: number) => void

type Props = Partial<Client> & {
  onSelect: SearchCustomerSelectHandler
  selectedId?: number
}

const Item: React.FC<Props> = ({ name, phone, doc, id, onSelect, selectedId }) => {
  const handleClick = () => {
    if (onSelect) onSelect(id)
  }
  return (
    <ItemContainer onClick={handleClick} actived={!!(selectedId === id)}>
      <ItemTitle>{name}</ItemTitle>
      <ItemDescription>
        <Text size={12}>{phone || doc || `ID: ${id}`}</Text>
        {onSelect && <ArrowRightIcon fontSize="small" />}
      </ItemDescription>
    </ItemContainer>
  )
}

export const ItemFound = memo(Item)
