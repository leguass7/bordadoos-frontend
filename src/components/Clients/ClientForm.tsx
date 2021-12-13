import { Button, ButtonGroup, Typography } from '@mui/material'
import { Client } from '@prisma/client'
import { Form } from '@unform/web'
import { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'

interface Props {
  clientId?: number
  onCancel?: () => void
  onSuccess?: (clientId?: number) => void
}

export const ClientForm: React.FC<Props> = ({ onCancel, onSuccess, clientId }) => {
  const [data, setData] = useState<Partial<Client>>({})

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const fetchClient = useCallback(async () => {
    if (clientId && clientId !== data.id) {
      setLoading(true)
      const { data: response } = await api.get(`/clients/${clientId}`)

      if (isMounted.current) {
        setLoading(false)
        if (response && response.success && response.client) setData(response.client)
      }
    }
  }, [clientId, isMounted, data.id])

  useEffect(() => {
    fetchClient()
  }, [fetchClient])

  const handleSubmit = useCallback(
    async (values: Partial<Client>) => {
      const url = clientId ? `/clients/${clientId}` : '/clients'
      const { data: response } = await api[clientId ? 'put' : 'post'](url, values)
      if (response && response.success) {
        setData({})
        if (onSuccess) onSuccess(clientId)
      }
    },
    [clientId, onSuccess]
  )

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data.id}>
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
          <FieldContainer>
            <ButtonGroup>
              <Button type="button" onClick={onCancel} color="primary" variant="outlined" disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained" disabled={loading}>
                Enviar
              </Button>
            </ButtonGroup>
          </FieldContainer>
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

const FormContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 100%;

  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.l}px;
`
