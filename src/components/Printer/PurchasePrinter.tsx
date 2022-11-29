import { Grid, Typography } from '@mui/material'
import styled from 'styled-components'

import { formatPrice } from '~/helpers'
import { formatDate } from '~/helpers/string'
import { PurchaseWithItems } from '~/services/api/purchase'

interface Props {
  purchase: PurchaseWithItems
}

export const PurchasePrinter: React.FC<Props> = ({ purchase }) => {
  return (
    <Content>
      {purchase?.id ? (
        <>
          <Grid justifyContent="space-between" container>
            <Typography variant="h4">
              <Typography component="p" variant="h6">
                {purchase.category.label} {'>'} {purchase.type.label}
              </Typography>
              <br />
              {purchase.client.name}
            </Typography>
            <Typography variant="h6" align="right">
              {formatDate(purchase.createdAt, 'dd/MM/yyyy HH:mm:ss')}
              <Typography variant="body1">
                <b>Total: </b> {formatPrice(purchase.value * purchase.qtd)}
              </Typography>
            </Typography>
          </Grid>
          <Grid container pt={6} direction="column">
            <Typography variant="h5">Contato</Typography>
            <Typography variant="body1">{purchase.client.phone}</Typography>
          </Grid>
          <Grid container pt={6} alignItems="stretch">
            <Grid item xs={9}>
              <Typography variant="h5">Status</Typography>
              <Typography variant="body1">
                <b>Valor: </b>
                {formatPrice(purchase.value)}
              </Typography>
              <Typography variant="body1">
                <b>Quantidade: </b>
                {purchase.qtd}
              </Typography>
              <Typography variant="body1">
                <b>Data de entrega: </b>
                {formatDate(purchase.deliveryDate, 'dd/MM/yyyy HH:mm:ss')}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="right" pt={9}>
                <b>Pago: </b> {purchase?.paid ? 'Sim' : 'Não'}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 910px;
  padding: 20px;
  /* padding-top: 200px; */
  /* flex: 1; */
`
