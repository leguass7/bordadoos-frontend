import { Card } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { PurchaseImages } from './PurchaseImages'

interface Props {
  purchaseId?: number
}

export const PurchaseImagesCard: React.FC<Props> = ({ purchaseId }) => {
  return (
    <Card>
      <CardTitle title={`Imagens do bordado`} divider />
      <PurchaseImages purchaseId={purchaseId} />
    </Card>
  )
}
