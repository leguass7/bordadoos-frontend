import { Fragment } from 'react'

import { Grid, Table, TableHead, TableRow, Typography, TableCell, TableBody, Divider } from '@mui/material'
import { PriceRules } from '@prisma/client'
import styled from 'styled-components'

import { formatPrice } from '~/helpers'
import { formatDate } from '~/helpers/string'
import { PurchaseWithItems } from '~/services/api/purchase'

import { PurchasePrinterHeader } from './PurchasePrinterHeader'

interface Props {
  purchase: PurchaseWithItems
  rules?: PriceRules[]
}

export const PurchaseClientPrinter: React.FC<Props> = ({ purchase, rules = [] }) => {
  const originalValue = purchase?.purchaseItem?.[0].originalValue || 0

  return (
    <Content>
      <PurchasePrinterHeader purchase={purchase} />

      <Divider sx={{ width: '100%' }} />

      {purchase?.id ? (
        <Grid container spacing={2} pt={1}>
          <Grid item xs={6}>
            <Grid justifyContent="space-between" container>
              <Typography variant="h6" noWrap>
                {purchase.type.label} {'>'} {purchase.category.label}
                <br />
                <Typography component="span" variant="h5">
                  {purchase.label}
                </Typography>
              </Typography>
            </Grid>

            <Grid container py={1} direction="column">
              <Typography variant="h6">Descrição</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.description || '---'}
              </Typography>
            </Grid>

            {/* {employee ? (
            <Grid container py={1} direction="column">
              <Typography variant="h6">Obs funcionário</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.employeeObs || '---'}
              </Typography>
            </Grid>
          ) : null} */}

            <Grid container py={1} direction="column">
              <Typography variant="h6">Obs cliente</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.clientObs || '---'}
              </Typography>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">Cliente</Typography>
                <Grid container justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="body1">Nome</Typography>
                    <Typography variant="body1">Telefone</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" variant="body1">
                      {purchase.client.name}
                    </Typography>
                    <Typography align="right" variant="body1">
                      {purchase.client.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12} pt={3}>
                <Typography variant="h6">Vendedor</Typography>
                <Grid container justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="body1">Nome</Typography>
                    <Typography variant="body1">Código</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" variant="body1">
                      {purchase.createdUser.name}
                    </Typography>
                    <Typography align="right" variant="body1">
                      {purchase.createdUser.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container pt={1} alignItems="flex-end">
                <Grid item xs={12}>
                  <Typography variant="h6">Status</Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body1">Valor:</Typography>
                      <Typography variant="body1">Quantidade:</Typography>
                      <Typography variant="body1">Subtotal:</Typography>
                      <Typography variant="body1">Total:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right" variant="body1">
                        {formatPrice(originalValue / purchase.qtd)}
                      </Typography>
                      <Typography align="right" variant="body1">
                        {purchase.qtd}
                      </Typography>
                      <Typography align="right" variant="body1">
                        {formatPrice(originalValue)}
                      </Typography>
                      <Typography align="right" variant="body1">
                        {formatPrice(purchase.value)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} pt={1}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body1">Data de entrada:</Typography>
                      <Typography variant="body1">Data de entrega:</Typography>
                      <Typography variant="body1">Pago:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right" variant="body1">
                        {formatDate(purchase.entryDate, 'dd/MM/yyyy HH:mm:ss') || '---'}
                      </Typography>
                      <Typography align="right" variant="body1">
                        {formatDate(purchase.deliveryDate, 'dd/MM/yyyy HH:mm:ss') || '---'}
                      </Typography>
                      <Typography align="right" variant="body1">
                        {purchase?.paid ? 'Sim' : 'Não'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* aaa */}
            </Grid>
          </Grid>

          {rules?.length ? (
            <Grid container pt={3} alignItems="stretch">
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
        </Grid>
      ) : null}
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 910px;
  padding: 4px 20px;
  height: 100%;
  /* padding-top: 200px; */
  /* flex: 1; */
`
