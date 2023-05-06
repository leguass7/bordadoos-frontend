import { useCallback, useMemo } from 'react'

import { Divider, Grid, Typography } from '@mui/material'
import type { PriceRules } from '@prisma/client'
import styled from 'styled-components'

import { formatDate } from '~/helpers/string'
import { PurchaseWithItems } from '~/services/api/purchase'

import { PurchaseEmbroideryColor } from '../purchase/PurchasePanel/PurchasePanelProvider'
import { PurchasePrinterHeader } from './PurchasePrinterHeader'

const overflowTextProps = {
  textOverflow: 'ellipsis',
  noWrap: false,
  overflow: 'hidden'
}

interface Props {
  purchase: PurchaseWithItems
  rules?: PriceRules[]
}

export const PurchaseOperatorPrinter: React.FC<Props> = ({ purchase, rules = [] }) => {
  const originalValue = purchase?.purchaseItem?.[0].originalValue || 0

  const colors = useMemo(() => {
    const localColors = (purchase?.colors as unknown as PurchaseEmbroideryColor[]) || []

    const sortedColors = localColors?.sort?.((a, b) => a?.colors?.length - b?.colors?.length)
    return sortedColors
  }, [purchase?.colors])

  const renderColors = useCallback((label: string, colors: PurchaseEmbroideryColor['colors']) => {
    if (!colors?.length) return null

    return colors.map((value, index) => {
      return (
        <div key={`${label}-${value}-${index}`}>
          <Typography variant="caption">
            Cor {index + 1}: {value}
          </Typography>
          <br />
        </div>
      )
    })
  }, [])

  return (
    <Content>
      <PurchasePrinterHeader purchase={purchase} />
      <Divider sx={{ width: '100%' }} />

      {purchase?.id ? (
        <Grid container spacing={2} pt={1}>
          <Grid item xs={6}>
            <Grid justifyContent="space-between" container>
              <Typography variant="h6" noWrap>
                {purchase?.type?.label && purchase?.category?.label ? (
                  <>
                    {purchase.type.label} {'>'} {purchase.category.label}
                  </>
                ) : null}
                <br />
                <Typography component="span" variant="h5">
                  {purchase.label}
                </Typography>
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

            <Grid container pt={1} alignItems="flex-end">
              <Grid item xs={12}>
                <Typography variant="h6">Status</Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Quantidade:</Typography>
                    <Typography variant="body1">Data de entrada:</Typography>
                    <Typography variant="body1">Data de entrega:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" variant="body1">
                      {purchase.qtd}
                    </Typography>
                    <Typography align="right" variant="body1">
                      {formatDate(purchase.entryDate, 'dd/MM/yyyy HH:mm:ss') || '---'}
                    </Typography>
                    <Typography align="right" variant="body1">
                      {formatDate(purchase.deliveryDate, 'dd/MM/yyyy HH:mm:ss') || '---'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container py={1} direction="column">
              <Typography variant="h6">Descrição</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.description || '---'}
              </Typography>
            </Grid>

            <Grid container py={1} direction="column">
              <Typography variant="h6">Obs funcionário</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.employeeObs || '---'}
              </Typography>
            </Grid>

            <Grid container py={1} direction="column">
              <Typography variant="h6">Obs cliente</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.clientObs || '---'}
              </Typography>
            </Grid>

            {colors?.length ? (
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">Cores</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={2}
                    overflow="hidden"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                    alignItems="stretch"
                  >
                    {colors?.map(({ label, colors }) => {
                      return (
                        <Grid key={`color-${label}`} item xs={4}>
                          <Typography variant="body1" {...overflowTextProps}>
                            {label}
                          </Typography>
                          {renderColors(label, colors)}
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
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
  padding: 4px 20px;
  height: 100%;
`
