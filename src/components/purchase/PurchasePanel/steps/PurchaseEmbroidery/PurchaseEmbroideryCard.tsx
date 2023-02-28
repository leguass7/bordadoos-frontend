import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { PurchaseEmbroideryForm } from './PurchaseEmbroideryForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryCard: React.FC<Props> = ({ onSuccess }) => {
  return (
    <Card>
      <CardTitle title="Dados do bordado" divider />
      <Grid item p={2} xs={12}>
        <PurchaseEmbroideryForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
