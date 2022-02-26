import React from 'react'

import { Card, Grid } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'
import { SpacedContainer } from '~/components/styled'

import { PurchaseProvider } from './PurchaseProvider'
import { SelectCustomer } from './SelectCustomer'
import { PanelWrapper } from './styles'

export const PurchasePanel: React.FC = () => {
  return (
    <PurchaseProvider>
      <PanelWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SelectCustomer />
          </Grid>
        </Grid>
      </PanelWrapper>
    </PurchaseProvider>
  )
}
