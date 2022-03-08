import { memo, useCallback, useState } from 'react'

import { useRouter } from 'next/router'

import { Edit } from '@mui/icons-material'
import { IconButton, Switch, Typography } from '@mui/material'

import { formatDate, toMoney } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { putDefault } from '~/services/api'
import { Column, Row } from '~/styles/grid'

import { CardItem } from '../ListItems/CardItem'
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
  const { push } = useRouter()

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

  const handleEdit = useCallback(() => {
    push(`/admin?purchaseId=${id}`)
  }, [push, id])

  return (
    <>
      <CardItem spacing={4} width="50%">
        <Row>
          <Column expand={1} align="flex-start">
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
          </Column>
          <Column expand={1}>
            <Typography variant="subtitle1" {...overflowTextProps}>
              {qtd}x
            </Typography>
            <Typography variant="subtitle1" {...overflowTextProps}>
              {toMoney(value)}
            </Typography>
            <Typography variant="subtitle1" {...overflowTextProps}>
              total: {toMoney(value * qtd)}
            </Typography>
          </Column>
          <Column expand={1} align="flex-end">
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
            <Row justify="flex-end">
              <IconButton onClick={handleEdit}>
                <Edit color="info" />
              </IconButton>
            </Row>
          </Column>
        </Row>
      </CardItem>
    </>
  )
}

export const PurchaseItem = memo(PurchaseItemComponent)
