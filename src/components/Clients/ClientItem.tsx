import { Client } from '.prisma/client'

import styled from 'styled-components'
import Edit from '@mui/icons-material/Edit'
import { IconButton, Switch, Typography } from '@mui/material'
import { memo, useCallback, useState } from 'react'

import { api } from '~/services/api'

import { FlatItem, FlatDescriptionContainer, FlatDescriptionLine, FlatTitle, FlatText } from '../FlatItem'

import { useIsMounted } from '~/hooks/useIsMounted'

interface Props extends Client {
  showModal: boolean
  toggleModal: (id?: number) => void
}

export const ClientItem: React.FC<Props> = ({ id, phone, name, showModal, toggleModal, actived }) => {
  const [itemActived, setItemActived] = useState(actived)
  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const toggleActived = useCallback(
    async e => {
      const newActived = e.target.checked
      setItemActived(newActived)

      setLoading(true)

      await api.put(`/clients/${id}`, { actived: newActived })
      if (isMounted.current) {
        setLoading(false)
      }
    },
    [id, isMounted]
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
      <SwitchContainer>
        <Switch name="actived" checked={itemActived} color="info" onChange={toggleActived} disabled={loading} />
        <Typography variant="caption" color="GrayText" htmlFor="actived" component="label">
          ativo
        </Typography>
      </SwitchContainer>
    </FlatItem>
  )
}

export const ClientItemMemo = memo(ClientItem) as typeof ClientItem

const SwitchContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: 4;
  height: 100%;
`
