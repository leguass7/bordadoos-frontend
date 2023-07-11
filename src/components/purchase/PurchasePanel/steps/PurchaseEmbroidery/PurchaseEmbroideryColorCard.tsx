import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseEmbroideryColorForm } from './PurchaseEmbroideryColorForm'

interface Props {
  onSuccess?: () => void
  purchaseId?: number
}

export const PurchaseEmbroideryColorCard: React.FC<Props> = ({ purchaseId }) => {
  const { info } = usePurchasePanelContext()

  return (
    <Card>
      <CardTitle title={`Cores do bordado - ${info?.name}`} divider />
      <Grid item p={2} xs={12}>
        <PurchaseEmbroideryColorForm purchaseId={purchaseId} />
      </Grid>
    </Card>
  )
}
