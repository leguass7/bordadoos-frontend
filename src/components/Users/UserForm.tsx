import { Button, ButtonGroup, Switch } from '@mui/material'
import { User } from '@prisma/client'
import { Form } from '@unform/web'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'

interface Props {
  userId?: number
  onCancel?: () => void
  onSuccess?: () => void
  initialData?: Partial<User>
}

export const UserForm: React.FC<Props> = ({ userId, onCancel, onSuccess, initialData = {} }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<User>>(initialData || {})

  const isMounted = useIsMounted()

  const fetchData = useCallback(async () => {
    if (userId) {
      setLoading(true)
      const { data: response } = await api.get(`/users/${userId}`)
      if (isMounted.current) {
        setLoading(false)
        if (response && response.success) {
          setData(response.user)
        }
      }
    }
  }, [isMounted, userId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    async (values: Partial<User>) => {
      if (userId) {
        api.put(`users/${userId}`, values).then(() => {
          if (onSuccess) onSuccess()
        })
      }
    },
    [userId, onSuccess]
  )

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data?.id}>
        <FormContainer>
          <FieldContainer>
            <Input name="name" label="Nome do usuário: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Input name="email" type="email" label="e-mail do usuário: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Input name="cellPhone" label="Telefone do usuário: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <ButtonGroup>
              {onCancel ? (
                <Button type="button" onClick={onCancel} color="primary" variant="outlined">
                  Cancelar
                </Button>
              ) : null}
              <Button type="submit" color="primary" variant="contained">
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
