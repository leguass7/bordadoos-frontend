import { useState, useEffect, useCallback, useRef } from 'react'

import { Button, ButtonGroup, Switch } from '@mui/material'
import { Client } from '@prisma/client'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import styled from 'styled-components'
import * as Yup from 'yup'

import { validateFormData } from '~/helpers/form'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getCustomer, storeCustomer } from '~/services/api/customer'

import { CircleLoading } from '../CircleLoading'
import { Input } from '../Form/Input'

const schema = Yup.object({
  name: Yup.string().required('O nome do cliente é obrigatório'),
  phone: Yup.string(),
  doc: Yup.string()
    .test('doc', 'CPF/CNPJ inválido', value => (value ? cpf.isValid(value) || cnpj.isValid(value) : true))
    .nullable()
})

export type FormCustomerSuccessHandler = (clientId?: number) => void
interface Props {
  clientId?: number
  onCancel?: () => void
  onSuccess?: FormCustomerSuccessHandler
}

export const ClientForm: React.FC<Props> = ({ onCancel, onSuccess, clientId }) => {
  const [data, setData] = useState<Partial<Client>>({})
  const formRef = useRef<FormHandles>(null)

  const [checked, setChecked] = useState(false)

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const fetchClient = useCallback(async () => {
    if (clientId && clientId !== data?.id) {
      setLoading(true)
      const { success = false, client } = await getCustomer(clientId)

      if (isMounted()) {
        setLoading(false)

        if (client?.doc) setChecked(cnpj.isValid(client.doc))
        if (success && client) setData(client)
      }
    }
  }, [clientId, isMounted, data.id])

  const handleSubmit = useCallback(
    async (values: Partial<Client>) => {
      const isInvalid = await validateFormData(schema, values, formRef.current)
      if (isInvalid) return

      const { success = false, clientId: apiClientId } = await storeCustomer({ ...values, id: clientId || 0 })

      if (success) {
        setData({})
        if (onSuccess) onSuccess(apiClientId || clientId)
      }
    },
    [clientId, onSuccess]
  )

  const handleToggleDoc = useCallback(async () => {
    setChecked(old => !old)
    formRef.current.clearField('doc')
  }, [])

  useEffect(() => {
    fetchClient()
  }, [fetchClient])

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={data} key={`form-customer-${data?.id}`}>
        <FormContainer>
          <FieldContainer>
            <Input fullWidth autoComplete="off" name="name" label="nome" />
          </FieldContainer>
          <FieldContainer>
            <Input fullWidth mask="phone" autoComplete="off" name="phone" label="telefone" />
          </FieldContainer>
          <FieldContainer>
            <div>
              CPF
              <Switch checked={checked} onChange={handleToggleDoc} />
              CNPJ
            </div>
            <Input
              fullWidth
              autoComplete="off"
              name="doc"
              mask={checked ? 'cnpj' : 'cpf'}
              placeholder={checked ? 'CNPJ' : 'CPF'}
            />
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
