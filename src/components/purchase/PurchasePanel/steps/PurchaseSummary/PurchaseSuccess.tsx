import { useCallback, useMemo } from 'react'
import { BiLike } from 'react-icons/bi'

import { Print } from '@mui/icons-material'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {
  purchaseId: number
  goBack?: () => void
  edited?: boolean
  name?: string
}

export const PurchaseSuccess: React.FC<Props> = ({ purchaseId, goBack, edited, name }) => {
  const status = useMemo(() => (edited ? 'editado' : 'criado'), [edited])
  const { clearAll } = usePurchasePanelContext()

  const handlePrint = useCallback(() => {
    const printablePage = window.open(`/admin/print/${purchaseId}`, '_blank')
    printablePage.print()
    printablePage.onafterprint = window.close
  }, [purchaseId])

  const handlePrev = useCallback(() => {
    clearAll()
    goBack()
  }, [goBack, clearAll])

  return (
    <Grid container py={30} flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h5" align="center">
        Pedido {status} com sucesso
      </Typography>
      <Typography variant="caption" align="center">
        Código do pedido: {name}
      </Typography>
      <BiLike size={50} />
      <br />
      <br />
      <br />
      <ButtonGroup>
        {goBack ? <Button onClick={handlePrev}>Criar outro pedido</Button> : null}
        <Button variant="contained" onClick={handlePrint} startIcon={<Print />}>
          Imprimir pedido
        </Button>
      </ButtonGroup>
    </Grid>
  )
}
