import { Grid, Divider } from '@mui/material'
import { PriceRules } from '@prisma/client'
import styled from 'styled-components'

import { PurchaseWithItems } from '~/services/api/purchase'

import { ClientPrinterContent } from './ClientPrinterContent'
import { PurchasePrinterHeader } from './PurchasePrinterHeader'

interface Props {
  purchase: PurchaseWithItems
  rules?: PriceRules[]
}

export const PurchaseClientPrinter: React.FC<Props> = ({ purchase, rules = [] }) => {
  return (
    <Content>
      <PurchasePrinterHeader purchase={purchase} />

      <Divider sx={{ width: '100%' }} />

      {purchase?.id ? (
        <Grid container spacing={2} pt={1}>
          <Grid item xs={6}>
            <ClientPrinterContent purchase={purchase} rules={rules} />
          </Grid>
          <Grid item xs={6}>
            <ClientPrinterContent purchase={purchase} rules={rules} />
          </Grid>
        </Grid>
      ) : null}
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 910px;
  padding: 0px 20px;
  /* overflow: hidden; */
  /* padding-top: 200px; */
  /* flex: 1; */
`
