import { ArrowRightAlt } from '@mui/icons-material'
import { Button, ButtonGroup, Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'
import { PanelWrapper } from '~/components/purchase/styles'

import { PurchaseEmbroideryForm } from './PurchaseEmbroideryForm'

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
          <Card>
            <CardTitle title="Dados do bordado" divider />
            <Grid item p={2} xs={12}>
              <PurchaseEmbroideryForm onSuccess={onSuccess} />
            </Grid>
          </Card>
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
