import { Embroiderytype } from '.prisma/client'

import { Edit } from '@mui/icons-material'
import { IconButton, Modal, Switch, Typography } from '@mui/material'
import { memo, useCallback, useState } from 'react'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import {
  FlatItem,
  FlatDescriptionContainer,
  FlatDescriptionLine,
  FlatTitle,
  FlatText,
  FlatIconContainer
} from '../FlatItem'
import { ModalForm } from '../ModalForm'
import { usePagination } from '../Providers/PaginationProvider'

import styled from 'styled-components'

import { EmbroideryTypeForm } from './EmbroideryTypeForm'

interface Props extends Embroiderytype {}

export const EmbroideryTypeItem: React.FC<Props> = ({ id, label, description, actived }) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itemActived, setItemActived] = useState(actived)
  const { refreshData } = usePagination()

  const isMounted = useIsMounted()

  const handleClose = useCallback(() => setOpenModal(false), [])
  const handleEditOpen = () => setOpenModal(true)

  const handleSuccess = useCallback(() => {
    handleClose()
    refreshData()
  }, [handleClose, refreshData])

  const toggleActived = useCallback(
    async e => {
      const newActived = e.target.checked
      setItemActived(newActived)

      setLoading(true)

      // await api.put(`/embroidery/types/${id}`, { actived: newActived })
      if (isMounted.current) {
        setLoading(false)
      }
    },
    [isMounted]
  )

  return (
    <>
      <FlatItem>
        <FlatDescriptionContainer style={{ padding: 10 }} grow={1}>
          <FlatDescriptionLine>
            <FlatTitle>{label}</FlatTitle>
          </FlatDescriptionLine>
          <FlatDescriptionLine>
            <FlatText>{description}</FlatText>
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
          <ModalForm title={'Editar tipo de borda'}>
            <EmbroideryTypeForm embTypeId={id} onSuccess={handleSuccess} onCancel={handleClose} />
          </ModalForm>
        </div>
      </Modal>
    </>
  )
}

export const EmbroideryTypeItemMemo = memo(EmbroideryTypeItem) as typeof EmbroideryTypeItem

const SwitchContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: 4;
  height: 100%;
`
