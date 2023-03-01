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
  const originalValue = purchase?.purchaseItem?.[0].originalValue || 0

  return (
    <Content>
      {purchase?.id ? (
        <>
          <Grid justifyContent="space-between" container>
            <Typography variant="h6">
              {purchase.category.label} {'>'} {purchase.type.label}
              <br />
              <Typography component="span" variant="h5">
                {purchase.label}
              </Typography>
            </Typography>
            <Typography variant="caption" align="right">
              {formatDate(purchase.createdAt, 'dd/MM/yyyy HH:mm:ss')}
              <Typography variant="body1">
                <b>Total: </b> {formatPrice(purchase.value)}
              </Typography>
            </Typography>
          </Grid>

          <Grid container py={2} direction="column">
            <Typography variant="h6">Descrição</Typography>
            <Typography component="span" align="justify" variant="caption">
              {purchase.description || '---'}
            </Typography>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">Cliente</Typography>
              <Typography variant="body1">
                <b>Nome: </b>
                {purchase.client.name}
              </Typography>
              <Typography variant="body1">
                <b>Telefone: </b>
                {purchase.client.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} pt={2}>
              <Grid container direction="column">
                <div>
                  <Typography variant="h6">Vendedor</Typography>
                  <Typography variant="body1">
                    <b>Nome: </b>
                    {purchase.createdUser.name}
                  </Typography>
                  <Typography variant="body1">
                    <b>Código: </b>
                    {purchase.createdUser.id}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container pt={3} alignItems="stretch">
            <Grid item xs={12}>
              <Typography variant="h6">Status</Typography>
              <Typography variant="body1">
                <b>Valor: </b>
                {formatPrice(originalValue / purchase.qtd)}
              </Typography>
              <Typography variant="body1">
                <b>Quantidade: </b>
                {purchase.qtd}
              </Typography>
              <Typography variant="body1">
                <b>Subtotal: </b>
                {formatPrice((purchase.qtd * originalValue) / purchase.qtd)}
              </Typography>
            </Grid>
            <Grid item xs={12} pt={2}>
              <Typography variant="body1">
                <b>Data de entrega: </b>
                {formatDate(purchase.deliveryDate, 'dd/MM/yyyy HH:mm:ss') || '---'}
              </Typography>
              <Typography variant="body1">
                <b>Pago: </b> {purchase?.paid ? 'Sim' : 'Não'}
              </Typography>
            </Grid>
          </Grid>

          {rules?.length ? (
            <Grid container pt={6} alignItems="stretch">
              <Grid item xs={12}>
                <Typography align="center" variant="h6">
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
                        <TableRow key={`rule-${id}`}>
                          <TableCell>{label}</TableCell>
                          <TableCell>{type === 'FIXED' ? 'Fixo' : 'Percentual'}</TableCell>
                          <TableCell>{type === 'FIXED' ? formatPrice(value) : `${value}`.concat('%')}</TableCell>
                        </TableRow>
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
