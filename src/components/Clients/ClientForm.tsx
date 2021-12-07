import { Button, ButtonGroup, Typography } from '@mui/material'
import { Client } from '@prisma/client'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'
import { usePagination } from '../Providers/PaginationProvider'

interface Props {
  onSubmit?: (data: Partial<Client>) => void
  onClose?: () => void
}

export const ClientForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [data, setData] = useState<Partial<Client>>({})
  const { refreshData } = usePagination()

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const { query } = useRouter()

  const clientId = useMemo(() => parseInt(`${query?.clientId ?? 0}`), [query])

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
      if (onSubmit) return onSubmit(values)

      const url = clientId ? `/clients/${clientId}` : '/clients'
      const { data: response } = await api[clientId ? 'put' : 'post'](url, values)

      if (response && response.success) {
        refreshData()
        setData({})
      }

      if (onClose) onClose()
    },
    [refreshData, clientId, onSubmit, onClose]
  )

  return (
    <>
      {loading ? (
        <CircleLoading />
      ) : (
        <Form onSubmit={handleSubmit} initialData={data} key={data.id}>
          <Typography variant="h6" align="center">
            {clientId ? 'Editar' : 'Adicionar'} cliente
          </Typography>
          <FormContainer>
            <FieldContainer>
              <Input autoComplete="off" name="name" placeholder="nome" />
            </FieldContainer>
            <FieldContainer>
              <Input autoComplete="off" name="phone" placeholder="telefone" />
            </FieldContainer>
            <FieldContainer>
              <ButtonGroup>
                <Button type="button" onClick={() => onClose()} color="primary" variant="outlined">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Enviar
                </Button>
              </ButtonGroup>
            </FieldContainer>
          </FormContainer>
        </Form>
      )}
    </>
  )
}

const FieldContainer = styled.div`
  padding: 4px;
`

const FormContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 600px;
  justify-content: center;
  align-items: center;
  padding: 4px;
`
