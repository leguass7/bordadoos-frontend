import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { PurchaseEmbroideryColorForm } from './PurchaseEmbroideryColorForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryColorCard: React.FC<Props> = ({ onSuccess }) => {
  return (
    <Card>
      <CardTitle title="Cores do bordado" divider />
      <Grid item p={2} xs={12}>
        <PurchaseEmbroideryColorForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
