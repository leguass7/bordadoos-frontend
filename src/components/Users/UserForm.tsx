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
  initialActived?: boolean
  onCancel?: () => void
  onSuccess?: () => void
}

export const UserForm: React.FC<Props> = ({ userId, onCancel, onSuccess, initialActived = false }) => {
  const [actived, setActived] = useState(initialActived)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<User>>({})

  const isMounted = useIsMounted()

  const handleToggleActived = useCallback(() => {
    setActived(old => !old)
  }, [])

  const fetchData = useCallback(async () => {
    if (userId) {
      setLoading(true)
      const { data: response } = await api.get(`/users/${userId}`)
      if (isMounted.current) {
        if (response && response.success) {
          setLoading(false)
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
        api.put(`users/${userId}`, { ...values, actived }).then(() => {
          if (onSuccess) onSuccess()
        })
      }
    },
    [userId, actived, onSuccess]
  )

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data.id}>
        <FormContainer>
          <FieldContainer>
            <Input name="name" label="Nome do usuário: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Input name="cellPhone" label="Telefone do usuário: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <label htmlFor="actived">Usuário ativo: </label>
            <Switch name="actived" checked={actived} color="info" onChange={handleToggleActived} />
          </FieldContainer>
          <FieldContainer>
            <ButtonGroup>
              <Button type="button" onClick={onCancel} color="primary" variant="outlined">
                Cancelar
              </Button>
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
