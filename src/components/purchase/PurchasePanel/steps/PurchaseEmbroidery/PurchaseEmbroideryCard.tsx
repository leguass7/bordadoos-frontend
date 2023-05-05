import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseEmbroideryForm } from './PurchaseEmbroideryForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryCard: React.FC<Props> = ({ onSuccess }) => {
  const { info } = usePurchasePanelContext()

  return (
    <Card>
      <CardTitle title={`Dados do bordado - ${info?.name}`} divider />
      <Grid item p={2} xs={12}>
        <PurchaseEmbroideryForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
