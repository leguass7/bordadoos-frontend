import { memo, useCallback, useState } from 'react'

import Edit from '@mui/icons-material/Edit'
import { CardActions, CardMedia, IconButton, Switch, Typography } from '@mui/material'
import { EmbroideryPosition } from '@prisma/client'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { putDefault } from '~/services/api'

import { CardExpandMore, CardItem } from '../ListItems/CardItem'

interface CollapsibleProps {
  description?: string
}

const CollapsibleContent: React.FC<CollapsibleProps> = ({ description }) => (
  <Typography variant="body2" color="text.secondary">
    {description || 'Nenhuma descrição encontrada'}
  </Typography>
)

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
  const [expand, setExpand] = useState(false)

  const [itemActived, setItemActived] = useState(actived)
  const isMounted = useIsMounted()

  const toggleActived = useCallback(
    async e => {
      const newActived = e.target.checked
      setItemActived(newActived)

      setLoading(true)

      await putDefault(`/embroidery/positions/${id}`, { actived: newActived })
      if (isMounted()) {
        setLoading(false)
      }
    },
    [isMounted, id]
  )

  return (
    <>
      <CardItem expand={expand} CollapsibleContent={<CollapsibleContent description={description} />}>
        <CardMedia image={image || '/logo250.png'} component="img" alt={label} />
        <Typography pl={2} variant="h6">
          {label}
        </Typography>
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
          <CardExpandMore
            expand={expand}
            onClick={() => setExpand(old => !old)}
            aria-expanded={expand}
            aria-label="saber mais"
          />
        </CardActions>
      </CardItem>
    </>
  )
}

export const EmbroideryPositionItemMemo = memo(EmbroideryPositionItem)

const SwitchContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
  align-items: center;
`
