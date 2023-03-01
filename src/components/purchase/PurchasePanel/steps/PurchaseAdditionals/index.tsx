import { useMemo } from 'react'

import { ArrowRightAlt } from '@mui/icons-material'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'

import { PanelWrapper } from '~/components/purchase/styles'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseAdditionalFormCard } from './PurchaseAdditionalFormCard'
import { SelectPurchaseRules } from './SelectPurchaseRules'

interface Props {
  onPrev?: () => void
  onNext?: () => void
  purchaseId?: number
  onSuccess?: () => void
}

export const PurchaseAdditionals: React.FC<Props> = ({ onNext, onPrev, purchaseId, onSuccess }) => {
  const { additionals } = usePurchasePanelContext()

  const disableNext = useMemo(() => {
    return !(additionals?.points && additionals.qtd)
  }, [additionals])

  return (
    <Grid container>
      <Grid item xs={12}>
        <PanelWrapper>
          <Grid item xs={12} sm={6}>
            <SelectPurchaseRules purchaseId={purchaseId} />
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseAdditionalFormCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" py={2}>
                <ButtonGroup>
                  <Button onClick={onPrev} variant="outlined">
                    Voltar
                  </Button>
                  <Button onClick={onNext} disabled={disableNext} variant="contained" endIcon={<ArrowRightAlt />}>
                    Avançar
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                {disableNext ? (
                  <Typography align="center" variant="caption" color="red">
                    Adicione as quantidades de peças e pontos do bordado para prosseguir
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}
