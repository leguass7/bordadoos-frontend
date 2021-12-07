import { Client } from '.prisma/client'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import { api } from '~/services/api'

import { FlatItem, FlatDescriptionContainer, FlatDescriptionLine, FlatTitle, FlatText } from '../FlatItem'
import { usePagination } from '../Providers/PaginationProvider'

interface Props extends Client {
  modalChange: () => void
}

export const ClientItem: React.FC<Props> = ({ id, phone, name, modalChange }) => {
  const { replace, pathname, query } = useRouter()
  const { refreshData } = usePagination()

  const clientId = useMemo(() => parseInt(`${query?.clientId ?? 0}`), [query])

  const handleEdit = useCallback(
    (id: number) => () => {
      if (id !== clientId) {
        if (modalChange) modalChange()
        replace(`${pathname}?clientId=${id}`, undefined, { shallow: true, scroll: true })
      }
    },
    [replace, pathname, clientId, modalChange]
  )

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
      <IconButton color="primary" onClick={handleEdit(id)} disabled={clientId === id}>
        <Edit />
      </IconButton>
      <IconButton color="error" onClick={handleDelete(id)}>
        <Delete />
      </IconButton>
    </FlatItem>
  )
}
