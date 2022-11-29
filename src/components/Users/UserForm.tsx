import { useCallback, useEffect, useState } from 'react'

import { Button, ButtonGroup } from '@mui/material'
import { User } from '@prisma/client'
import { Form } from '@unform/web'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { getDefault, putDefault } from '~/services/api'
import { IResponseUser } from '~/services/api/api.types'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'

interface Props {
  userId?: number
  onCancel?: () => void
  onSuccess?: () => void
  disable?: boolean
  initialData?: Partial<User>
}

export const UserForm: React.FC<Props> = ({ userId, onCancel, onSuccess, initialData = {}, disable = false }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<User>>(initialData || {})

  const isMounted = useIsMounted()

  const fetchData = useCallback(async () => {
    if (userId) {
      setLoading(true)
      const { success = false, user = {} } = await getDefault<IResponseUser>(`/users/${userId}`)
      if (isMounted()) {
        setLoading(false)
        if (success) setData(user)
      }
    }
  }, [isMounted, userId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    async (values: Partial<User>) => {
      if (userId) {
        setLoading(true)
        await putDefault(`users/${userId}`, values)
        if (isMounted()) {
          setLoading(false)
          if (onSuccess) onSuccess()
        }
      }
    },
    [userId, onSuccess, isMounted]
  )

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data?.id}>
        <FormContainer>
          <FieldContainer>
            <Input name="name" label="Nome do usuário: " autoComplete="off" disabled={disable} />
          </FieldContainer>
          <FieldContainer>
            <Input name="email" type="email" label="e-mail do usuário: " autoComplete="off" disabled={disable} />
          </FieldContainer>
          <FieldContainer>
            <Input
              name="cellPhone"
              label="Telefone do usuário: "
              placeholder="(99) 9 9999-999"
              autoComplete="off"
              disabled={disable}
            />
          </FieldContainer>
          {disable ? null : (
            <ButtonContainer>
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
            </ButtonContainer>
          )}
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
