import { useState, useEffect, useCallback, useMemo } from 'react'

import { Button, ButtonGroup, Typography } from '@mui/material'
import { Client } from '@prisma/client'
import { Form } from '@unform/web'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { getCustomer, storeCustomer } from '~/services/api/customer'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'

export type FormCustomerSuccessHandler = (clientId?: number) => void
interface Props {
  clientId?: number
  onCancel?: () => void
  onSuccess?: FormCustomerSuccessHandler
}

export const ClientForm: React.FC<Props> = ({ onCancel, onSuccess, clientId }) => {
  const [data, setData] = useState<Partial<Client>>({})

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const fetchClient = useCallback(async () => {
    if (clientId && clientId !== data?.id) {
      setLoading(true)
      const { success = false, client } = await getCustomer(clientId)

      if (isMounted()) {
        setLoading(false)
        if (success && client) setData(client)
      }
    }
  }, [clientId, isMounted, data.id])

  const handleSubmit = useCallback(
    async (values: Partial<Client>) => {
      const { success = false, clientId: apiClientId } = await storeCustomer({ ...values, id: clientId || 0 })
      if (success) {
        setData({})
        if (onSuccess) onSuccess(apiClientId || clientId)
      }
    },
    [clientId, onSuccess]
  )

  useEffect(() => {
    fetchClient()
  }, [fetchClient])

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={`form-customer-${data?.id}`}>
        <FormContainer>
          <FieldContainer>
            <Input required fullWidth autoComplete="off" name="name" placeholder="nome" />
          </FieldContainer>
          <FieldContainer>
            <Input required fullWidth autoComplete="off" name="phone" placeholder="telefone" />
          </FieldContainer>
          <FieldContainer>
            <Input fullWidth autoComplete="off" name="doc" placeholder="cpf/cnpj" />
          </FieldContainer>
          <ButtonContainer>
            <ButtonGroup>
              <Button type="button" onClick={onCancel} color="primary" variant="outlined" disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained" disabled={loading}>
                Enviar
              </Button>
            </ButtonGroup>
          </ButtonContainer>
        </FormContainer>
      </Form>
      {loading ? <CircleLoading light /> : null}
    </>
  )
}

const FieldContainer = styled.div`
  display: block;
  width: 100%;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacing.l}px 0px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`

const FormContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 100%;

  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.l}px;
`
