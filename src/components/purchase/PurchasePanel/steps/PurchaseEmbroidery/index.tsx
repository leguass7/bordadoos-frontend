import { useMemo } from 'react'

import { ArrowRightAlt } from '@mui/icons-material'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'

import { PanelWrapper } from '~/components/purchase/styles'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseEmbroideryCard } from './PurchaseEmbroideryCard'
import { PurchaseEmbroideryColorCard } from './PurchaseEmbroideryColorCard'

interface Props {
  onNext?: () => void
  onPrev?: () => void
  onSuccess?: () => void
}

export const PurchaseEmbroidery: React.FC<Props> = ({ onNext, onPrev, onSuccess }) => {
  const { embroidery } = usePurchasePanelContext()

  const disableNext = useMemo(() => {
    return !(embroidery?.label && !!embroidery.colors?.length)
  }, [embroidery])

  return (
    <Grid container>
      <Grid item xs={12}>
        <PanelWrapper>
          <PurchaseEmbroideryCard onSuccess={onSuccess} />
        </PanelWrapper>

        <PanelWrapper>
          <PurchaseEmbroideryColorCard onSuccess={onSuccess} />
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
                    Adicione nome, tipo, posição e ao menos uma cor do bordado para prosseguir
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
