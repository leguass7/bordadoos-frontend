import { Button, ButtonGroup, Switch } from '@mui/material'
import { Embroiderytype, User } from '@prisma/client'
import { Form } from '@unform/web'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'

interface Props {
  embTypeId?: number
  onCancel?: () => void
  onSuccess?: () => void
}

export const EmbroideryTypeForm: React.FC<Props> = ({ embTypeId, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<Embroiderytype>>({})

  const isMounted = useIsMounted()

  const fetchData = useCallback(async () => {
    if (embTypeId) {
      setLoading(true)
      // const { data: response } = await api.get(`/embroidery/types/${embTypeId}`)
      const response = { success: true }
      if (isMounted.current) {
        setLoading(false)
        if (response && response.success) {
          // setData(response.data)
        }
      }
    }
  }, [isMounted, embTypeId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    async (values: Partial<User>) => {
      if (embTypeId) {
        api.put(`users/${embTypeId}`, values).then(() => {
          if (onSuccess) onSuccess()
        })
      }
    },
    [embTypeId, onSuccess]
  )

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data.id}>
        <FormContainer>
          <FieldContainer>
            <Input name="label" label="Tipo de bordado: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Input name="description" label="Descrição do tipo de bordado: " autoComplete="off" />
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
