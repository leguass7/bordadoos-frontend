import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseAdditionalsForm } from './PurchaseAdditionalsForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseAdditionalFormCard: React.FC<Props> = ({ onSuccess }) => {
  const { info } = usePurchasePanelContext()

  return (
    <Card>
      <CardTitle title={`Dados financeiros - ${info?.name}`} divider />
      <Grid item p={2} xs={12}>
        <PurchaseAdditionalsForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
