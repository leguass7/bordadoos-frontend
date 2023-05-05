import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseInfoForm } from './PurchaseInfoForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseInfoCard: React.FC<Props> = ({ onSuccess }) => {
  const { info } = usePurchasePanelContext()

  return (
    <Card>
      <CardTitle title={`Dados do pedido - ${info.name}`} divider />
      <Grid item p={2} xs={12}>
        <PurchaseInfoForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
