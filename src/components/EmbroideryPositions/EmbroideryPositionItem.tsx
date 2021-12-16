import Edit from '@mui/icons-material/Edit'
import { CardActions, CardContent, IconButton, Switch, Typography } from '@mui/material'
import { EmbroideryPosition } from '@prisma/client'
import { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import { CardItem } from '../ListItems/CardItem'

interface Props extends EmbroideryPosition {
  showModal: boolean
  toggleModal: (id?: number) => void
}

export const EmbroideryPositionItem: React.FC<Props> = ({
  id,
  label,
  description,
  actived,
  showModal,
  toggleModal,
  image
}) => {
  const [loading, setLoading] = useState(false)
  const [itemActived, setItemActived] = useState(actived)
  const isMounted = useIsMounted()

  const toggleActived = useCallback(
    async e => {
      const newActived = e.target.checked
      setItemActived(newActived)

      setLoading(true)

      // await api.put(`/embroidery/positions/${id}`, { actived: newActived })
      if (isMounted.current) {
        setLoading(false)
      }
    },
    [isMounted]
  )

  return (
    <>
      <CardItem spacing={4} sx={{ width: 200 }}>
        {/* <CardMedia image={image || '/logo64.png'} component="img" alt={label} height={200}  /> */}
        <ImageContainer src={image || '/logo250.png'} alt={label} />
        <CardContentTest hasContent={!!description}>
          <Typography variant="h6">{label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContentTest>
        <CardActions disableSpacing>
          <IconButton color="primary" onClick={() => toggleModal(id)} disabled={!!showModal}>
            <Edit />
          </IconButton>
          <SwitchContainer>
            <Switch name="actived" checked={itemActived} color="info" onChange={toggleActived} disabled={loading} />
            <Typography variant="caption" color="GrayText" htmlFor="actived" component="label">
              ativo
            </Typography>
          </SwitchContainer>
        </CardActions>
      </CardItem>
    </>
  )
}

export const EmbroideryPositionItemMemo = memo(EmbroideryPositionItem)

const SwitchContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 4px;
  flex: 1;
  height: 100%;
`

const ImageContainer = styled.img`
  width: 100%;
  object-fit: contain;
  max-height: 200px;
  display: block;
  position: relative;
  margin: 0 auto;
`

const CardContentTest = styled(CardContent)<{ hasContent?: boolean }>`
  height: 86px;
  overflow: hidden;
`
