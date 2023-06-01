import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { Edit, Lock, LockOpen, Print, ContentCopy } from '@mui/icons-material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { Grid, IconButton, Switch, Tooltip, Typography } from '@mui/material'

import { formatDate, toMoney } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import type { IConfigPurchaseRules } from '~/serverSide/config/config.dto'
import { calculatePurchaseOriginalValue } from '~/serverSide/purchases/purchase-configs/purchase-config.helper'
import { putDefault } from '~/services/api'
import { getConfig } from '~/services/api/config'

import { CircleLoading } from '../CircleLoading'
import { SimpleModal } from '../Common/SimpleModal'
import { CardExpandMore, CardItem } from '../ListItems/CardItem'
import type { PurchaseWithRelations } from './PurchaseList'
import { PurchaseImages } from './PurchasePanel/steps/PurchaseImages/PurchaseImages'

const overflowTextProps = {
  textOverflow: 'ellipsis',
  noWrap: true,
  overflow: 'hidden'
}

interface CollapsibleContentProps extends PurchaseWithRelations {}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ qtd, points, developmentPrice }) => {
  const [purchaseRules, setPurchaseRules] = useState<IConfigPurchaseRules>(null as IConfigPurchaseRules)
  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const embValue = useMemo(() => {
    let value = 0
    if (purchaseRules) value = calculatePurchaseOriginalValue(qtd, points, 0, purchaseRules)

    return value
  }, [qtd, points, purchaseRules])

  // const originalValue = useMemo(() => {
  //   return embValue + developmentPrice
  // }, [embValue, developmentPrice])

  const fetchPurchaseRules = useCallback(async () => {
    setLoading(true)
    const response = await getConfig('purchaseRules')
    if (isMounted()) {
      setLoading(false)
      if (response?.data?.meta) setPurchaseRules(response.data.meta as any)
    }
  }, [setPurchaseRules, isMounted])

  const unityValue = useMemo(() => {
    const value = embValue / qtd

    return value || 0
  }, [embValue, qtd])

  useEffect(() => {
    fetchPurchaseRules()
  }, [fetchPurchaseRules])

  return (
    <Grid container justifyContent="space-between" alignItems="stretch">
      <Grid item xs={6}>
        <Typography color="GrayText" {...overflowTextProps}>
          Peças
        </Typography>
        <Typography variant="subtitle1" {...overflowTextProps}>
          {qtd}x
        </Typography>
        <Typography variant="subtitle1" {...overflowTextProps}>
          {toMoney(unityValue)}
        </Typography>
        <Typography variant="subtitle1" {...overflowTextProps}>
          subtotal: {toMoney(embValue)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography textAlign="right" color="GrayText" {...overflowTextProps}>
          taxa de desenvolvimento
        </Typography>
        <Typography variant="body1" align="right" {...overflowTextProps}>
          {toMoney(developmentPrice)}
        </Typography>
        <Typography textAlign="right" color="GrayText" {...overflowTextProps}>
          Total
        </Typography>
        <Typography variant="body1" align="right" {...overflowTextProps}>
          {toMoney(embValue + developmentPrice)}
        </Typography>
      </Grid>
      {loading ? <CircleLoading /> : null}
    </Grid>
  )
}

interface Props extends PurchaseWithRelations {
  isAdmin?: boolean
}

const PurchaseItemComponent: React.FC<Props> = ({ isAdmin, ...props }) => {
  const purchase = { ...props, isAdmin: undefined }
  const { value = 0, done = false, id, category, type, createdAt, client, deliveryDate, lock } = props
  const hasLabel = !!(type?.label || category?.label)

  const [expand, setExpand] = useState(false)

  const { push } = useRouter()
  const [itemDone, setItemDone] = useState(done)
  const [itemLock, setItemLock] = useState(!!lock)
  const [openImageModal, setOpenImageModal] = useState(false)

  const toggleOpenImageModal = useCallback(() => {
    setOpenImageModal(old => !old)
  }, [])

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

  const handlePrint = useCallback((src: string) => {
    const page = window.open(src, '_blank')

    page.onload = () => {
      setTimeout(() => {
        page.print()
        page.close()
      }, 0)
    }

    // console.log(a)
    // history.pushState
    // const frames = Array.from(document.getElementsByName('printFrame'))
    // const frame = frameRef.current
    // frame.src = src
    // const frame = frames.find((f: any) => {
    //   const frameId = Number(f.title)
    //   return frameId === id
    // }) as HTMLIFrameElement
    // if (frame) {
    //   frame.focus()
    //   frame.contentWindow.print()
    // frame.contentWindow.onafterprint = () => {
    //   frame.src = ''
    // }
    // }
  }, [])

  return (
    <>
      {/* <iframe ref={frameRef} style={{ display: 'none' }} title={`${id}`} name="printFrame" width="0" height="0" /> */}
      <CardItem spacing={4} width="50%" expand={expand} CollapsibleContent={<CollapsibleContent {...purchase} />}>
        <Grid container>
          <Grid item xs={12} sm={6} alignItems="flex-start">
            <Typography variant="caption">{purchase?.name}</Typography>
            <Typography pt={1} variant="body1">{`${client?.name ?? '--'} `}</Typography>

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
              {purchase?.label ?? '--'}
            </Typography>
            <Grid container direction="column">
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
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} alignItems="flex-end" justifyContent="space-between">
            <Grid container flexDirection="column" alignItems="flex-end">
              <Typography variant="caption" color="GrayText" {...overflowTextProps}>
                data (criação) ~ data (entrega)
              </Typography>
              <Typography variant="body1" {...overflowTextProps}>
                {createdAt && formatDate(createdAt, 'dd/MM/yyyy')}
                {' ~ '}
                {deliveryDate ? formatDate(deliveryDate, 'dd/MM/yyyy') : 'Sem prazo'}
              </Typography>
            </Grid>
            <Grid item xs={12} pt={1}>
              <Grid container direction="column" alignItems="right">
                <Typography textAlign="right" variant="body1" {...overflowTextProps}>
                  Contato
                </Typography>
                <Typography variant="caption" align="right">
                  {client?.phone ?? '---'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} pt={1}>
              <Typography variant="subtitle1" align="right" {...overflowTextProps}>
                Total: {toMoney(value)}
              </Typography>
            </Grid>
            {/* <Grid align="flex-end">
              <Typography variant="caption" color="GrayText" {...overflowTextProps}>
                data de criação
              </Typography>
              <Typography variant="body1" {...overflowTextProps}>
              </Typography>
            </Grid> */}
            <Grid container pt={1} justifyContent="flex-end">
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
                  <IconButton onClick={() => handlePrint(`/admin/print/${id}`)}>
                    <Print />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Imagens">
                <div>
                  <IconButton onClick={toggleOpenImageModal}>
                    <AddPhotoAlternateIcon />
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
              <div>
                <CardExpandMore
                  expand={expand}
                  onClick={() => setExpand(old => !old)}
                  aria-expanded={expand}
                  aria-label="saber mais"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardItem>
      <SimpleModal maxWidth={910} title="Imagens do pedido" onToggle={toggleOpenImageModal} open={openImageModal}>
        <PurchaseImages purchaseId={id} />
      </SimpleModal>
    </>
  )
}

export const PurchaseItem = memo(PurchaseItemComponent)
