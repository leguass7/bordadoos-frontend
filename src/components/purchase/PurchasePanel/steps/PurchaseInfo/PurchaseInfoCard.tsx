import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { PurchaseInfoForm } from './PurchaseInfoForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseInfoCard: React.FC<Props> = ({ onSuccess }) => {
  return (
    <Card>
      <CardTitle title="Dados do pedido" divider />
      <Grid item p={2} xs={12}>
        <PurchaseInfoForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
