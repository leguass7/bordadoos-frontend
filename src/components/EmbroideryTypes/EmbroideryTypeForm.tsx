import { Button, ButtonGroup } from '@mui/material'
import { EmbroideryType } from '@prisma/client'
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
  const [data, setData] = useState<Partial<EmbroideryType>>({})

  const isMounted = useIsMounted()

  const fetchData = useCallback(async () => {
    if (embTypeId && embTypeId !== data.id) {
      setLoading(true)
      const { data: response } = await api.get(`/embroidery/types/${embTypeId}`)
      if (isMounted.current) {
        setLoading(false)
        if (response && response.success) {
          setData(response.data)
        }
      }
    }
  }, [isMounted, embTypeId, data.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    async (values: Partial<EmbroideryType>) => {
      const url = embTypeId ? `/embroidery/types/${embTypeId}` : '/embroidery/types'
      const { data: response } = await api[embTypeId ? 'put' : 'post'](url, values)
      if (response && response.success) {
        setData({})
        if (onSuccess) onSuccess()
      }
    },
    [embTypeId, onSuccess]
  )

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data.id}>
        <FormContainer>
          <FieldContainer>
            <Input name="label" label="Tipo de bordado: " required autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Input name="description" label="Descrição do tipo de bordado: " autoComplete="off" />
          </FieldContainer>
          <ButtonContainer>
            <ButtonGroup>
              <Button type="button" onClick={onCancel} color="primary" variant="outlined">
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained">
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
