import { EmbroideryType } from '.prisma/client'

import { Edit } from '@mui/icons-material'
import { IconButton, Switch, Typography } from '@mui/material'

import { memo, useCallback, useState } from 'react'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import { FlatItem, FlatDescriptionContainer, FlatDescriptionLine, FlatTitle, FlatText } from '../ListItems/FlatItem'

import styled from 'styled-components'

interface Props extends EmbroideryType {
  showModal: boolean
  toggleModal: (id?: number) => void
}

export const EmbroideryTypeItem: React.FC<Props> = ({ id, label, description, actived, showModal, toggleModal }) => {
  const [loading, setLoading] = useState(false)
  const [itemActived, setItemActived] = useState(actived)
  const isMounted = useIsMounted()

  const toggleActived = useCallback(
    async e => {
      const newActived = e.target.checked
      setItemActived(newActived)

      setLoading(true)

      await api.put(`/embroidery/types/${id}`, { actived: newActived })
      if (isMounted()) {
        setLoading(false)
      }
    },
    [isMounted, id]
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
        <IconButton color="primary" onClick={() => toggleModal(id)} disabled={!!showModal}>
          <Edit />
        </IconButton>
        <SwitchContainer>
          <Switch name="actived" checked={itemActived} color="info" onChange={toggleActived} disabled={loading} />
          <Typography variant="caption" color="GrayText" htmlFor="actived" component="label">
            ativo
          </Typography>
        </SwitchContainer>
      </FlatItem>
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
