import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button, ButtonGroup } from '@mui/material'
import { EmbroideryPosition, EmbroideryType } from '@prisma/client'
import { Form } from '@unform/web'
import styled from 'styled-components'

import { useIsMounted } from '~/hooks/useIsMounted'
import { api, getDefault } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'
import Select from '../Form/Select'

interface Props {
  embPosId?: number
  onCancel?: () => void
  onSuccess?: () => void
}

export const EmbroideryPositionForm: React.FC<Props> = ({ embPosId, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<EmbroideryPosition>>({})
  const [embTypes, setEmbTypes] = useState<EmbroideryType[]>([])

  const isMounted = useIsMounted()

  const fetchEmbTypes = useCallback(async () => {
    if (!embTypes.length) {
      setLoading(true)

      const { success = false, data: apiData } = await getDefault('embroidery/types?size=1000')
      if (isMounted()) {
        setLoading(false)
        if (success) setEmbTypes(apiData)
      }
    }
  }, [isMounted, embTypes.length])

  const fetchData = useCallback(async () => {
    if (embPosId && embPosId !== data.id) {
      setLoading(true)

      const { success = false, data: apiData } = await getDefault(`/embroidery/positions/${embPosId}`)
      if (isMounted()) {
        setLoading(false)
        if (success) setData(apiData)
      }
    }
  }, [isMounted, embPosId, data.id])

  useEffect(() => {
    fetchData()
    fetchEmbTypes()
  }, [fetchData, fetchEmbTypes])

  const handleSubmit = useCallback(
    async (values: Partial<EmbroideryPosition>) => {
      const url = embPosId ? `/embroidery/positions/${embPosId}` : '/embroidery/positions'
      const { data: response } = await api[embPosId ? 'put' : 'post'](url, values)
      if (response && response.success) {
        setData({})
        if (onSuccess) onSuccess()
      }
    },
    [embPosId, onSuccess]
  )

  const embTypeItems = useMemo(() => embTypes.map(({ id, label }) => ({ value: id, label })), [embTypes])

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data} key={data.id}>
        <FormContainer>
          <FieldContainer>
            <Input name="label" label="Posição do bordado: " required autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Input name="description" label="Descrição da posição do bordado: " autoComplete="off" />
          </FieldContainer>
          <FieldContainer>
            <Select name="embType" label="Tipo de bordado" items={embTypeItems} required />
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
