import { Client } from '.prisma/client'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { memo, useCallback } from 'react'

import { api } from '~/services/api'

import { FlatItem, FlatDescriptionContainer, FlatDescriptionLine, FlatTitle, FlatText } from '../FlatItem'
import { usePagination } from '../Providers/PaginationProvider'

interface Props extends Client {
  showModal: boolean
  toggleModal: (id?: number) => void
}

export const ClientItem: React.FC<Props> = ({ id, phone, name, showModal, toggleModal }) => {
  const { refreshData } = usePagination()

  const handleDelete = useCallback(
    (clientId: number) => async () => {
      await api.delete(`/clients/${clientId}`)
      refreshData()
    },
    [refreshData]
  )

  return (
    <FlatItem>
      <FlatDescriptionContainer style={{ padding: 10 }} grow={1}>
        <FlatDescriptionLine>
          <FlatTitle>{name}</FlatTitle>
        </FlatDescriptionLine>
        <FlatDescriptionLine>
          <FlatText>{phone}</FlatText>
        </FlatDescriptionLine>
      </FlatDescriptionContainer>
      <IconButton color="primary" onClick={() => toggleModal(id)} disabled={showModal}>
        <Edit />
      </IconButton>
      <IconButton color="error" onClick={handleDelete(id)}>
        <Delete />
      </IconButton>
    </FlatItem>
  )
}

export const ClientItemMemo = memo(ClientItem) as typeof ClientItem
