import React from 'react'
import { toast } from 'react-toastify'

import { Grid, Paper } from '@mui/material'
import { Purchase } from '@prisma/client'
import styled from 'styled-components'

import { postDefault, putDefault } from '~/services/api'

import { Container } from '../CardTitle'
import { ErrorMessage } from '../Form/styles'
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
        <Grid container>
          <Grid item xs={12} sm={6} md={4} position="relative">
            <SelectCustomer />
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
            <Grid item xs={12} md={6}>
              <PurchaseForm onSubmit={handleSubmit} purchaseId={purchaseId} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Image src="/camisa.png" alt="Camisa" />
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
