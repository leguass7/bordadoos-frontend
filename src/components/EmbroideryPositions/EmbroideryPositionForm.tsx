import { Button, ButtonGroup } from '@mui/material'
import { EmbroideryPosition } from '@prisma/client'
import { Form } from '@unform/web'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'

interface Props {
  embPosId?: number
  onCancel?: () => void
  onSuccess?: () => void
}

export const EmbroideryPositionForm: React.FC<Props> = ({ embPosId, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<EmbroideryPosition>>({})

  const isMounted = useIsMounted()

  const fetchData = useCallback(async () => {
    if (embPosId && embPosId !== data.id) {
      setLoading(true)
      // const { data: response } = await api.get(`/embroidery/positions/${embPosId}`)
      const response = { success: false, data: {} }
      if (isMounted.current) {
        setLoading(false)
        if (response && response.success) {
          setData(response.data)
        }
      }
    }
  }, [isMounted, embPosId, data.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    async (values: Partial<EmbroideryPosition>) => {
      const url = embPosId ? `/embroidery/positions/${embPosId}` : '/embroidery/positions'
      // const { data: response } = await api[embPosId ? 'put' : 'post'](url, values)
      const response = { success: true }
      if (response && response.success) {
        setData({})
        if (onSuccess) onSuccess()
      }
    },
    [embPosId, onSuccess]
  )

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data.id}>
        <FormContainer>
          <FieldContainer>
            <Input name="label" label="Posição do bordado: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Input name="description" label="Descrição da posição do bordado: " autoComplete="off" />
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
