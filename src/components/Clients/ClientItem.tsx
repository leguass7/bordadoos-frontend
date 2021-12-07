import { Client } from '.prisma/client'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { memo, useCallback, useState } from 'react'

import { api } from '~/services/api'

import { FlatItem, FlatDescriptionContainer, FlatDescriptionLine, FlatTitle, FlatText } from '../FlatItem'
import { ModalForm } from '../ModalForm'
import { usePagination } from '../Providers/PaginationProvider'
import { ClientForm } from './ClientForm'

interface Props extends Client {}

export const ClientItem: React.FC<Props> = ({ id, phone, name }) => {
  const [openModal, setOpenModal] = useState(false)
  const { refreshData } = usePagination()

  const handleCancel = () => setOpenModal(false)

  const handleEditOpen = () => setOpenModal(true)

  const handleDelete = useCallback(
    (clientId: number) => async () => {
      await api.delete(`/clients/${clientId}`)
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
            <FlatText>{phone}</FlatText>
          </FlatDescriptionLine>
        </FlatDescriptionContainer>
        <IconButton color="primary" onClick={handleEditOpen} disabled={!!openModal}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={handleDelete(id)}>
          <Delete />
        </IconButton>
      </FlatItem>
      <Modal open={!!openModal} onClose={handleCancel}>
        <div>
          <ModalForm title={'Editar cliente'}>
            <ClientForm clientId={id} onCancel={handleCancel} />
          </ModalForm>
        </div>
      </Modal>
    </>
  )
}

export const ClientItemMemo = memo(ClientItem) as typeof ClientItem
