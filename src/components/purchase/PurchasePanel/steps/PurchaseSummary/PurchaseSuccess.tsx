import { useCallback, useMemo } from 'react'
import { BiLike } from 'react-icons/bi'

import { Print } from '@mui/icons-material'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {
  purchaseId: number
  goBack?: () => void
  edited?: boolean
}

export const PurchaseSuccess: React.FC<Props> = ({ purchaseId, goBack, edited }) => {
  const status = useMemo(() => (edited ? 'editado' : 'criado'), [edited])
  const { info } = usePurchasePanelContext()
  const { clearAll, isEditing } = usePurchasePanelContext()

  const handlePrint = useCallback(() => {
    const frames = Array.from(document.getElementsByName('printFrame'))

    const frame = frames.find((f: any) => {
      const frameId = Number(f.title)
      return frameId === purchaseId
    }) as HTMLIFrameElement

    if (frame) {
      frame.focus()
      frame.contentWindow.print()
    }
  }, [purchaseId])

  // const handlePrint = useCallback(() => {
  //   const printablePage = window.open(`/admin/print/${purchaseId}`, '_blank')
  //   printablePage.print()
  //   printablePage.onafterprint = window.close
  // }, [purchaseId])

  const handlePrev = useCallback(() => {
    clearAll()
    goBack()
  }, [goBack, clearAll])

  return (
    <>
      <Grid container py={30} flexDirection="column" justifyContent="center" alignItems="center">
        <iframe
          src={`/admin/print/${purchaseId}`}
          style={{ display: 'none' }}
          title={`${purchaseId}`}
          name="printFrame"
          width="0"
          height="0"
        />
        <Typography variant="h5" align="center">
          Pedido {status} com sucesso
        </Typography>
        <Typography variant="caption" align="center">
          Código do pedido: {info?.name || purchaseId}
        </Typography>
        <BiLike size={50} />
        <br />
        <br />
        <br />
        <ButtonGroup>
          {goBack ? <Button onClick={handlePrev}>Voltar</Button> : null}
          <Button variant="contained" onClick={handlePrint} startIcon={<Print />}>
            Imprimir pedido
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  )
}
