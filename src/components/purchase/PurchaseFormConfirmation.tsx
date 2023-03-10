import { useCallback, useMemo } from 'react'
import { BiLike, BiCheck } from 'react-icons/bi'

import Link from 'next/link'

import { ArrowBack, Print } from '@mui/icons-material'
import { Button, ButtonGroup, Grid, IconButton, Link as MuiLink, Typography } from '@mui/material'

interface Props {
  edited?: boolean
  purchaseId: number
  onPrev?: () => void
}

export const PurchaseFormConfirmation: React.FC<Props> = ({ edited = false, purchaseId, onPrev }) => {
  const status = useMemo(() => (edited ? 'editado' : 'criado'), [edited])

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

  return (
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
      <BiLike size={50} />
      <br />
      <br />
      <br />
      <ButtonGroup>
        {onPrev ? (
          <Button startIcon={<ArrowBack />} onClick={onPrev}>
            Voltar
          </Button>
        ) : null}
        <Button variant="contained" onClick={handlePrint} startIcon={<Print />}>
          Imprimir pedido
        </Button>
      </ButtonGroup>
    </Grid>
  )
}
