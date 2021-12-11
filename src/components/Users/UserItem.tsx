import { User } from '.prisma/client'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { memo, useCallback, useState } from 'react'

import { api } from '~/services/api'

import { FlatItem, FlatDescriptionContainer, FlatDescriptionLine, FlatTitle, FlatText } from '../FlatItem'
import { ModalForm } from '../ModalForm'
import { usePagination } from '../Providers/PaginationProvider'
import { UserForm } from './UserForm'

interface Props extends User {}

export const ClientItem: React.FC<Props> = ({ id, name, email, cellPhone, actived }) => {
  const [openModal, setOpenModal] = useState(false)
  const { refreshData } = usePagination()

  const handleClose = useCallback(() => setOpenModal(false), [])

  const handleEditOpen = () => setOpenModal(true)

  const handleDelete = useCallback(
    (userId: number) => async () => {
      await api.delete(`/users/${userId}`)
      refreshData()
    },
    [refreshData]
  )

  const handleSuccess = useCallback(() => {
    handleClose()
    refreshData()
  }, [handleClose, refreshData])

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
        <IconButton color="primary" onClick={handleEditOpen} disabled={!!openModal}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={handleDelete(id)}>
          <Delete />
        </IconButton>
      </FlatItem>
      <Modal open={!!openModal} onClose={handleClose}>
        <div>
          <ModalForm title={'Editar usuário'}>
            <UserForm initialActived={actived} userId={id} onSuccess={handleSuccess} onCancel={handleClose} />
          </ModalForm>
        </div>
      </Modal>
    </>
  )
}

export const UserItemMemo = memo(ClientItem) as typeof ClientItem
