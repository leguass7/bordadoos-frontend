import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseEmbroideryColorForm } from './PurchaseEmbroideryColorForm'

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryColorCard: React.FC<Props> = ({ onSuccess }) => {
  const { info } = usePurchasePanelContext()

  return (
    <Card>
      <CardTitle title={`Cores do bordado - ${info?.name}`} divider />
      <Grid item p={2} xs={12}>
        <PurchaseEmbroideryColorForm onSuccess={onSuccess} />
      </Grid>
    </Card>
  )
}
