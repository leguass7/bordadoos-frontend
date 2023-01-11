import { Fragment } from 'react'

import { Grid, Table, TableHead, TableRow, Typography, TableCell, TableBody } from '@mui/material'
import { PriceRules } from '@prisma/client'
import styled from 'styled-components'

import { formatPrice } from '~/helpers'
import { formatDate } from '~/helpers/string'
import { PurchaseWithItems } from '~/services/api/purchase'

interface Props {
  purchase: PurchaseWithItems
  rules?: PriceRules[]
}

export const PurchasePrinter: React.FC<Props> = ({ purchase, rules = [] }) => {
  return (
    <Content>
      {purchase?.id ? (
        <>
          <Grid justifyContent="space-between" container>
            <Typography variant="h6">
              {purchase.category.label} {'>'} {purchase.type.label}
              <br />
              <Typography component="span" variant="h4">
                {purchase.client.name}
              </Typography>
            </Typography>
            <Typography variant="h6" align="right">
              {formatDate(purchase.createdAt, 'dd/MM/yyyy HH:mm:ss')}
              <Typography variant="body1">
                <b>Total: </b> {formatPrice(purchase.value)}
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
                {formatPrice(purchase.value / purchase.qtd)}
              </Typography>
              <Typography variant="body1">
                <b>Quantidade: </b>
                {purchase.qtd}
              </Typography>
              <Typography variant="body1">
                <b>Data de entrega: </b>
                {formatDate(purchase.deliveryDate, 'dd/MM/yyyy HH:mm:ss') || '---'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="right" pt={9}>
                <b>Pago: </b> {purchase?.paid ? 'Sim' : 'Não'}
              </Typography>
            </Grid>
          </Grid>
          {rules?.length ? (
            <Grid container pt={6} alignItems="stretch">
              <Grid item xs={12}>
                <Typography align="center" variant="h5">
                  Adicionais
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rules?.map?.(({ id, label, value, type }) => {
                      return (
                        <Fragment key={`rule-${id}`}>
                          <TableCell>{label}</TableCell>
                          <TableCell>{type === 'FIXED' ? 'Fixo' : 'Percentual'}</TableCell>
                          <TableCell>{type === 'FIXED' ? formatPrice(value) : `${value}`.concat('%')}</TableCell>
                        </Fragment>
                      )
                    })}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          ) : null}
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
