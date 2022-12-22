import React from 'react'
import { toast } from 'react-toastify'

import { Grid, Paper } from '@mui/material'
import { Purchase } from '@prisma/client'
import styled from 'styled-components'

import { postDefault, putDefault } from '~/services/api'

import { Container } from '../CardTitle'
import { ErrorMessage } from '../Form/styles'
import { PurchaseConfig } from './PurchaseConfig'
import { PurchaseForm } from './PurchaseForm'
import { usePurchase } from './PurchaseProvider'
import { SelectCustomer } from './SelectCustomer'
import { PanelWrapper } from './styles'

interface Props {
  purchaseId?: number
}

export const PurchasePanel: React.FC<Props> = ({ purchaseId }) => {
  const { clientId } = usePurchase()

  const handleSubmit = async (data: Purchase, creating?: boolean) => {
    const { success = false, message = 'Ocorreu um erro' } = creating
      ? await postDefault<{}>(`/purchases`, data)
      : await putDefault<{}>(`/purchases/${purchaseId}`, data)

    if (success) toast(`Pedido ${creating ? 'criado' : 'editado'} com sucesso`, { type: 'success' })
    else toast(message, { type: 'error' })
  }

  return (
    <>
      <PanelWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SelectCustomer />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PurchaseConfig />
          </Grid>
        </Grid>
      </PanelWrapper>
      <PanelWrapper>
        <Paper>
          <Container divider>
            <p>Criar pedido</p>
            {!clientId ? <ErrorMessage>Selecione um cliente para prosseguir</ErrorMessage> : null}
          </Container>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} md={9}>
              <PurchaseForm onSubmit={handleSubmit} purchaseId={purchaseId} />
            </Grid>
            <Grid item xs={6} sm={4} md={3} margin="0 auto">
              <Grid container height="100%" alignItems="center">
                <Image src="/camisa.png" alt="Camisa" />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </PanelWrapper>
    </>
  )
}

const Image = styled.img`
  position: relative;
  max-width: 100%;
  display: block;
  margin: 0 auto;
`
