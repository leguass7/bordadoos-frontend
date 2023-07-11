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
  const colors = useMemo(() => {
    const localColors = (purchase?.colors as unknown as PurchaseEmbroideryColor[]) || []

    const sortedColors = localColors?.sort?.((a, b) => a?.colors?.length - b?.colors?.length)
    return sortedColors
  }, [purchase?.colors])

  const renderColors = useCallback((label: string, colors: PurchaseEmbroideryColor['colors']) => {
    if (!colors?.length) return null

    return colors.map((value, index) => {
      return (
        <Grid key={`${label}-${value}-${index}`} item xs={12}>
          <Typography variant="caption">
            {index + 1}: {value}
          </Typography>
        </Grid>
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
            {purchase?.type?.label || purchase?.category?.label ? (
              <Grid justifyContent="space-between" container>
                <Typography variant="h6" noWrap>
                  {purchase?.type?.label && purchase?.category?.label ? (
                    <>
                      {purchase.type.label} {'>'} {purchase.category.label}
                    </>
                  ) : null}
                  <br />
                  <Typography component="span" whiteSpace="pre-line" variant="h5">
                    {purchase.label}
                  </Typography>
                </Typography>
              </Grid>
            ) : null}

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
                    {purchase.points ? <Typography variant="body1">Pontos:</Typography> : null}
                    <Typography variant="body1">Data de entrada:</Typography>
                    <Typography variant="body1">Data de entrega:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" variant="body1">
                      {purchase.qtd}
                    </Typography>
                    {purchase.points ? (
                      <Typography align="right" variant="body1">
                        {purchase.points}
                      </Typography>
                    ) : null}
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
            <Grid container direction="column">
              <Typography variant="h6">Obs funcionário</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.employeeObs || '---'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {/* <Grid container py={1} direction="column">
              <Typography variant="h6">Descrição</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.description || '---'}
              </Typography>
            </Grid> */}

            {/* <Grid container py={1} direction="column">
              <Typography variant="h6">Obs cliente</Typography>
              <Typography component="span" align="justify" variant="caption">
                {purchase.clientObs || '---'}
              </Typography>
            </Grid> */}

            {colors?.length ? (
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">Cores</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    overflow="hidden"
                    width="100%"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    {colors?.map(({ label, colors }, index) => {
                      return (
                        <Grid item key={`color-${label}`} xs={12} sm={6} md={4}>
                          <Typography variant="body1" lineHeight={1} {...overflowTextProps}>
                            {label}
                          </Typography>
                          <Grid
                            container
                            flexWrap="wrap"
                            columnSpacing={0}
                            flexDirection="row"
                            justifyContent="flex-start"
                          >
                            {renderColors(label, colors)}
                          </Grid>
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
`
