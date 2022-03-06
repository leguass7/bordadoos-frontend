import React from 'react'

import { Grid, Paper } from '@mui/material'
import styled from 'styled-components'

import { CardTitle } from '../CardTitle'
import { PurchaseActions } from './PurchaseActions'
import { PurchaseForm } from './PurchaseForm'
import { PurchaseProvider } from './PurchaseProvider'
import { SelectCustomer } from './SelectCustomer'
import { PanelWrapper } from './styles'

export const PurchasePanel: React.FC = () => {
  return (
    <PurchaseProvider>
      <PanelWrapper>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} position="relative">
            <SelectCustomer />
          </Grid>
        </Grid>
      </PanelWrapper>
      <PanelWrapper>
        <Paper>
          <Grid container justifyContent="space-between">
            <Grid width={300} item>
              <Image src="/camisa.png" alt="Camisa" />
            </Grid>
            <Grid container direction="column" flex={1}>
              <CardTitle title="Criar pedido" divider />
              <PurchaseForm />
            </Grid>
          </Grid>
        </Paper>
      </PanelWrapper>
    </PurchaseProvider>
  )
}

const Image = styled.img`
  position: relative;
  max-width: 100%;
  display: block;
  margin: 0 auto;
`
