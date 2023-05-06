import { memo, useCallback, useState } from 'react'

import { useRouter } from 'next/router'

import { Edit, Lock, LockOpen, Print, ContentCopy } from '@mui/icons-material'
import { IconButton, Switch, Tooltip, Typography } from '@mui/material'

import { formatDate, toMoney } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { putDefault } from '~/services/api'
import { Column, Row } from '~/styles/grid'

import { CardItem } from '../ListItems/CardItem'
import { PurchaseWithRelations } from './PurchaseList'

const overflowTextProps = {
  textOverflow: 'ellipsis',
  noWrap: true,
  overflow: 'hidden'
}

// interface CollapsibleContentProps {
//   value?: number
//   createdAt?: Date
//   qtd?: number
// }

// const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ value = 0, createdAt, qtd = 0 }) => {
//   const unityValue = value / qtd

//   return (
//     <Row justify="space-between" align="stretch">
//       <Column align="flex-start">
//         <Typography variant="subtitle1" {...overflowTextProps}>
//           {qtd}x
//         </Typography>
//         <Typography variant="subtitle1" {...overflowTextProps}>
//           {toMoney(unityValue)}
//         </Typography>
//       </Column>
//       <Column align="flex-end">
//         <Typography variant="caption" color="GrayText" {...overflowTextProps}>
//           data de criação
//         </Typography>
//         <Typography variant="body1" {...overflowTextProps}>
//           {createdAt && formatDate(createdAt, 'dd/MM/yyyy')}
//         </Typography>
//       </Column>
//     </Row>
//   )
// }

interface Props extends PurchaseWithRelations {
  isAdmin?: boolean
}

const PurchaseItemComponent: React.FC<Props> = ({ label, name, isAdmin, ...props }) => {
  const { value = 0, done = false, id, category, type, createdAt, client, deliveryDate, lock } = props
  const hasLabel = !!(type?.label || category?.label)

  const { push } = useRouter()
  const [itemDone, setItemDone] = useState(done)
  const [itemLock, setItemLock] = useState(!!lock)

  // const originalValue = purchaseItem?.[0]?.originalValue || value

  // const [expand, setExpand] = useState(false)

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const toggleActived = useCallback(
    async e => {
      if (!id) return

      const newDone = e.target.checked
      setItemDone(newDone)

      setLoading(true)
      await putDefault(`/purchases/${id}`, { done: newDone })
      if (isMounted()) setLoading(false)
    },
    [isMounted, id]
  )

  const toggleLock = useCallback(async () => {
    if (!id) return

    let newLock = false

    setItemLock(old => {
      newLock = !old
      return newLock
    })

    setLoading(true)
    await putDefault(`/purchases/${id}`, { lock: newLock })
    if (isMounted()) setLoading(false)
  }, [isMounted, id])

  const handleEdit = useCallback(() => {
    push(`/admin?purchaseId=${id}`)
  }, [push, id])

  const handleCopy = useCallback(() => {
    push(`/admin?purchaseId=${id}&duplicated=true`)
  }, [push, id])

  const handlePrint = useCallback(() => {
    const frames = Array.from(document.getElementsByName('printFrame'))

    const frame = frames.find((f: any) => {
      const frameId = Number(f.title)
      return frameId === id
    }) as HTMLIFrameElement

    if (frame) {
      frame.focus()
      frame.contentWindow.print()
    }
  }, [id])

  return (
    <>
      <iframe
        src={`/admin/print/${id}`}
        style={{ display: 'none' }}
        title={`${id}`}
        name="printFrame"
        width="0"
        height="0"
      />
      <CardItem
        spacing={4}
        width="50%"
        // expand={expand}
        // CollapsibleContent={<CollapsibleContent value={originalValue} createdAt={createdAt} qtd={qtd} />}
      >
        <Row align="stretch">
          <Column align="flex-start">
            <Typography variant="caption">{name}</Typography>
            <br />
            <Typography variant="body1">{`${client?.name ?? '--'} `}</Typography>

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
              {label ?? '--'}
            </Typography>
            <Switch
              name="done"
              checked={itemDone}
              color="info"
              onChange={toggleActived}
              disabled={loading || itemLock}
            />
            <Typography pl={1} variant="caption" color="GrayText" htmlFor="done" component="label">
              Finalizado
            </Typography>
          </Column>
          <Column align="flex-end" expand={1} justify="space-between">
            <Column align="flex-end">
              <Typography variant="caption" color="GrayText" {...overflowTextProps}>
                data (criação) ~ data (entrega)
              </Typography>
              <Typography variant="body1" {...overflowTextProps}>
                {createdAt && formatDate(createdAt, 'dd/MM/yyyy')}
                {' ~ '}
                {deliveryDate ? formatDate(deliveryDate, 'dd/MM/yyyy') : 'Sem prazo'}
              </Typography>
            </Column>
            <Column align="right">
              <Typography textAlign="right" variant="body1" {...overflowTextProps}>
                Contato
              </Typography>
              <Typography variant="caption">{client?.phone ?? '---'}</Typography>
            </Column>
            <Column>
              <Typography variant="subtitle1" {...overflowTextProps}>
                Total: {toMoney(value)}
              </Typography>
            </Column>
            {/* <Column align="flex-end">
              <Typography variant="caption" color="GrayText" {...overflowTextProps}>
                data de criação
              </Typography>
              <Typography variant="body1" {...overflowTextProps}>
              </Typography>
            </Column> */}
            <Row align="flex-end" justify="flex-end">
              <Tooltip title="Editar pedido">
                <div>
                  <IconButton disabled={!!itemLock || loading} onClick={handleEdit}>
                    <Edit />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Copiar pedido">
                <div>
                  <IconButton disabled={loading} onClick={handleCopy}>
                    <ContentCopy />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Imprimir pedido">
                <div>
                  <IconButton onClick={handlePrint}>
                    <Print />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title={lock ? 'Desbloquear pedido' : 'Bloquear a edição pedido'}>
                <div>
                  <IconButton disabled={!isAdmin || loading} onClick={toggleLock}>
                    {itemLock ? <Lock /> : <LockOpen />}
                  </IconButton>
                </div>
              </Tooltip>
              {/* <CardExpandMore
                expand={expand}
                onClick={() => setExpand(old => !old)}
                aria-expanded={expand}
                aria-label="saber mais"
              /> */}
            </Row>
          </Column>
        </Row>
      </CardItem>
    </>
  )
}

export const PurchaseItem = memo(PurchaseItemComponent)
