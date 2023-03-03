import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { PurchaseAdditionalsForm } from './PurchaseAdditionalsForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseAdditionalFormCard: React.FC<Props> = ({ onSuccess }) => {
  return (
    <Card>
      <CardTitle title="Dados financeiros" divider />
      <Grid item p={2} xs={12}>
        <PurchaseAdditionalsForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
