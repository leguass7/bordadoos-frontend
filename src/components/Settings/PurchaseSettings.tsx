import { Divider, Grid, Typography } from '@mui/material'

import { PurchaseSettingsForm } from './Form/PurchaseSettingsForm'
import { PurchaseSettingsPriceForm } from './Form/PurchaseSettingsPriceForm'

interface Props {
  children?: React.ReactNode
}

export const PurchaseSettings: React.FC<Props> = () => {
  return (
    <>
      <Typography p={1} pb={2} variant="h4">
        Pedidos
      </Typography>
      <PurchaseSettingsForm />
      <Divider />
      <Typography p={2} variant="h4">
        Acréscimos de preços
      </Typography>
      <PurchaseSettingsPriceForm />
      <Grid container pb={20} />
    </>
  )
}
