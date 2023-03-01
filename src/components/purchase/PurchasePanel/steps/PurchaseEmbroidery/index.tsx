import { ArrowRightAlt } from '@mui/icons-material'
import { Button, ButtonGroup, Grid } from '@mui/material'

import { PanelWrapper } from '~/components/purchase/styles'

import { PurchaseEmbroideryCard } from './PurchaseEmbroideryCard'
import { PurchaseEmbroideryColorCard } from './PurchaseEmbroideryColorCard'

interface Props {
  onNext?: () => void
  onPrev?: () => void
  onSuccess?: () => void
}

export const PurchaseEmbroidery: React.FC<Props> = ({ onNext, onPrev, onSuccess }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PanelWrapper>
          <PurchaseEmbroideryCard onSuccess={onSuccess} />
        </PanelWrapper>

        <PanelWrapper>
          <PurchaseEmbroideryColorCard />
        </PanelWrapper>

        <PanelWrapper>
          <Grid container justifyContent="center" alignItems="center" py={2}>
            <ButtonGroup>
              <Button onClick={onPrev} variant="outlined">
                Voltar
              </Button>
              <Button onClick={onNext} variant="contained" endIcon={<ArrowRightAlt />}>
                Avançar
              </Button>
            </ButtonGroup>
          </Grid>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}
