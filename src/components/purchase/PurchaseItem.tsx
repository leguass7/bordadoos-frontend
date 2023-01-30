import { memo, useCallback, useState } from 'react'

import { useRouter } from 'next/router'

import { Edit, Print } from '@mui/icons-material'
import { IconButton, Switch, Typography } from '@mui/material'

import { formatDate, toMoney } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { putDefault } from '~/services/api'
import { Column, Row } from '~/styles/grid'

import { CardExpandMore, CardItem } from '../ListItems/CardItem'
import { PurchaseWithRelations } from './PurchaseList'

const overflowTextProps = {
  textOverflow: 'ellipsis',
  noWrap: true,
  overflow: 'hidden'
}

interface CollapsibleContentProps {
  value?: number
  createdAt?: Date
  qtd?: number
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ value = 0, createdAt, qtd = 0 }) => {
  const unityValue = value / qtd

  return (
    <Row justify="space-between" align="stretch">
      <Column align="flex-start">
        <Typography variant="subtitle1" {...overflowTextProps}>
          {qtd}x
        </Typography>
        <Typography variant="subtitle1" {...overflowTextProps}>
          {toMoney(unityValue)}
        </Typography>
      </Column>
      <Column align="flex-end">
        <Typography variant="caption" color="GrayText" {...overflowTextProps}>
          data de criação
        </Typography>
        <Typography variant="body1" {...overflowTextProps}>
          {createdAt && formatDate(createdAt, 'dd/MM/yyyy')}
        </Typography>
      </Column>
    </Row>
  )
}

interface Props extends PurchaseWithRelations {}

const PurchaseItemComponent: React.FC<Props> = ({ ...props }) => {
  const { value = 0, qtd = 0, done = false, id, category, client, type, createdAt, deliveryDate, purchaseItem } = props
  const hasLabel = !!(type?.label || category?.label)
  const [itemDone, setItemDone] = useState(done)
  const { push } = useRouter()

  const originalValue = purchaseItem?.[0]?.originalValue || value

  const [expand, setExpand] = useState(false)

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const toggleActived = useCallback(
    async e => {
      if (id) {
        const newDone = e.target.checked
        setItemDone(newDone)

        setLoading(true)

        await putDefault(`/purchases/${id}`, { done: newDone })
        if (isMounted()) {
          setLoading(false)
        }
      }
    },
    [isMounted, id]
  )

  const handleEdit = useCallback(() => {
    push(`/admin?purchaseId=${id}`)
  }, [push, id])

  const handlePrint = useCallback(() => {
    const printablePage = window.open(`/admin/print/${id}`, '_blank')
    printablePage.print()
    printablePage.onafterprint = window.close
  }, [id])

  return (
    <>
      <CardItem
        spacing={4}
        width="50%"
        expand={expand}
        CollapsibleContent={<CollapsibleContent value={originalValue} createdAt={createdAt} qtd={qtd} />}
      >
        <Row align="stretch">
          <Column align="flex-start">
            <Typography variant="subtitle1" {...overflowTextProps}>
              {hasLabel ? (
                <>
                  {type?.label ?? '--'} {'>'} {category?.label ?? '--'}
                </>
              ) : (
                '--'
              )}
            </Typography>
            <Typography variant="h6" {...overflowTextProps}>
              {client?.name ?? '--'}
            </Typography>
            <Switch name="done" checked={itemDone} color="info" onChange={toggleActived} disabled={loading} />
            <Typography pl={1} variant="caption" color="GrayText" htmlFor="done" component="label">
              Finalizado
            </Typography>
          </Column>
          <Column align="flex-end" expand={1} justify="space-between">
            <Column align="flex-end">
              <Typography variant="caption" color="GrayText" {...overflowTextProps}>
                data de entrega
              </Typography>
              <Typography variant="body1" {...overflowTextProps}>
                {deliveryDate && formatDate(deliveryDate, 'dd/MM/yyyy')}
              </Typography>
              <Typography variant="subtitle1" {...overflowTextProps}>
                total: {toMoney(value)}
              </Typography>
            </Column>
            <Row align="flex-end" justify="flex-end">
              <IconButton onClick={handleEdit}>
                <Edit />
              </IconButton>
              <IconButton onClick={handlePrint}>
                <Print />
              </IconButton>
              <CardExpandMore
                expand={expand}
                onClick={() => setExpand(old => !old)}
                aria-expanded={expand}
                aria-label="saber mais"
              />
            </Row>
          </Column>
        </Row>
      </CardItem>
    </>
  )
}

export const PurchaseItem = memo(PurchaseItemComponent)
