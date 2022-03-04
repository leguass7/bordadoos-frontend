import { memo, useCallback, useState } from 'react'

import { Edit } from '@mui/icons-material'
import { IconButton, Switch, Typography } from '@mui/material'
import { Prisma } from '@prisma/client'

import { formatDate, toMoney } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { putDefault } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { CardColumn, CardItem, CardRow } from '../ListItems/CardItem'
import { PurchaseWithRelations } from './PurchaseList'

interface Props extends PurchaseWithRelations {}

const overflowTextProps = {
  textOverflow: 'ellipsis',
  noWrap: true,
  overflow: 'hidden'
}

const PurchaseItemComponent: React.FC<Props> = ({ ...props }) => {
  const { value = 0, qtd = 0, done = false, id, category, client, type, createdAt, deliveryDate } = props
  const [itemDone, setItemDone] = useState(done)

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const toggleActived = useCallback(
    async e => {
      if (id) {
        const newDone = e.target.checked
        setItemDone(newDone)

        setLoading(true)

        await putDefault(`/purchases/${id}`, { done: newDone })
        if (isMounted.current) {
          setLoading(false)
        }
      }
    },
    [isMounted, id]
  )

  return (
    <>
      <CardItem spacing={4} width="50%" breakpoints={{ mobile: '420px' }}>
        <CardRow align="stretch" justify="stretch">
          <CardColumn expand={1} align="flex-start">
            <Typography variant="subtitle1" {...overflowTextProps}>
              {type?.label ?? '--'} {'>'} {category?.label ?? '--'}
            </Typography>
            <Typography variant="h6" {...overflowTextProps}>
              {client?.name ?? '--'}
            </Typography>
            <Switch name="done" checked={itemDone} color="info" onChange={toggleActived} disabled={loading} />
            <Typography pl={2} variant="caption" color="GrayText" htmlFor="done" component="label">
              Finalizado
            </Typography>
          </CardColumn>
          <CardColumn expand={1}>
            <Typography variant="subtitle1" {...overflowTextProps}>
              {qtd}x
            </Typography>
            <Typography variant="subtitle1" {...overflowTextProps}>
              {toMoney(value)}
            </Typography>
            <Typography variant="subtitle1" {...overflowTextProps}>
              total: {toMoney(value * qtd)}
            </Typography>
          </CardColumn>
          <CardColumn expand={1} align="flex-end">
            <Typography variant="caption" color="GrayText" {...overflowTextProps}>
              data de criação
            </Typography>
            <Typography variant="body1" {...overflowTextProps}>
              {createdAt && formatDate(createdAt, 'dd/MM/yyyy')}
            </Typography>
            <Typography variant="caption" color="GrayText" {...overflowTextProps}>
              data de entrega
            </Typography>
            <Typography variant="body1" {...overflowTextProps}>
              {deliveryDate && formatDate(deliveryDate, 'dd/MM/yyyy')}
            </Typography>
            <CardRow justify="flex-end">
              <IconButton onClick={() => {}}>
                <Edit color="info" />
              </IconButton>
            </CardRow>
          </CardColumn>
        </CardRow>
      </CardItem>
    </>
  )
}

export const PurchaseItem = memo(PurchaseItemComponent)
