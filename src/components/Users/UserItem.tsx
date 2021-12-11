import { User } from '.prisma/client'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { memo, useCallback } from 'react'

import { api } from '~/services/api'

import { FlatItem, FlatDescriptionContainer, FlatDescriptionLine, FlatTitle, FlatText } from '../FlatItem'
import { usePagination } from '../Providers/PaginationProvider'

interface Props extends User {}

export const ClientItem: React.FC<Props> = ({ id, name, email, cellPhone }) => {
  const { refreshData } = usePagination()

  const handleDelete = useCallback(
    (userId: number) => async () => {
      await api.delete(`/users/${userId}`)
      refreshData()
    },
    [refreshData]
  )

  return (
    <>
      <FlatItem>
        <FlatDescriptionContainer style={{ padding: 10 }} grow={1}>
          <FlatDescriptionLine>
            <FlatTitle>{name}</FlatTitle>
          </FlatDescriptionLine>
          <FlatDescriptionLine>
            <FlatText>{email}</FlatText>
          </FlatDescriptionLine>
          <FlatDescriptionLine>
            <FlatText>{cellPhone}</FlatText>
          </FlatDescriptionLine>
        </FlatDescriptionContainer>
        <IconButton color="primary" onClick={() => {}} disabled={false}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={handleDelete(id)}>
          <Delete />
        </IconButton>
      </FlatItem>
    </>
  )
}

export const UserItemMemo = memo(ClientItem) as typeof ClientItem
