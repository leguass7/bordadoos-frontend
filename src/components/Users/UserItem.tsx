import { User } from '.prisma/client'

import { Edit } from '@mui/icons-material'
import { Avatar, IconButton, Modal, Switch, Typography } from '@mui/material'

import { memo, useCallback, useState } from 'react'

import { useIsMounted } from '~/hooks/useIsMounted'
import { putDefault } from '~/services/api'

import {
  FlatItem,
  FlatDescriptionContainer,
  FlatDescriptionLine,
  FlatTitle,
  FlatText,
  FlatIconContainer
} from '../ListItems/FlatItem'
import { ModalForm } from '../ModalForm'
import { usePagination } from '../Providers/PaginationProvider'
import { UserForm } from './UserForm'

import styled from 'styled-components'

interface Props extends User {}

export const ClientItem: React.FC<Props> = ({ id, name, email, cellPhone, actived, image }) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itemActived, setItemActived] = useState(actived)

  const isMounted = useIsMounted()

  const handleClose = useCallback(() => setOpenModal(false), [])
  const handleEditOpen = () => setOpenModal(true)

  const handleSuccess = useCallback(() => {
    handleClose()
  }, [handleClose])

  const toggleActived = useCallback(
    async e => {
      const newActived = e.target.checked
      setItemActived(newActived)

      setLoading(true)

      await putDefault(`/users/${id}`, { actived: newActived })
      if (isMounted()) setLoading(false)
    },
    [id, isMounted]
  )

  return (
    <>
      <FlatItem>
        <FlatIconContainer>
          <Avatar alt={name} src={image} />
        </FlatIconContainer>
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
        <SwitchContainer>
          <Switch name="actived" checked={itemActived} color="info" onChange={toggleActived} disabled={loading} />
          <Typography variant="caption" color="GrayText" htmlFor="actived" component="label">
            ativo
          </Typography>
        </SwitchContainer>
      </FlatItem>
      <Modal open={!!openModal} onClose={handleClose}>
        <div>
          <ModalForm title={'Editar usuário'}>
            <UserForm userId={id} onSuccess={handleSuccess} onCancel={handleClose} />
          </ModalForm>
        </div>
      </Modal>
    </>
  )
}

export const UserItemMemo = memo(ClientItem) as typeof ClientItem

const SwitchContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: 4;
  height: 100%;
`
