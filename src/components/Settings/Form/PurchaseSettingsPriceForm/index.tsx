import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Grid } from '@mui/material'
import { PriceRuleModality, PriceRuleType } from '@prisma/client'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { CircleLoading } from '~/components/CircleLoading'
import { validateFormData } from '~/helpers/form'
import { useIsMounted } from '~/hooks/useIsMounted'
import { savePriceRules, listPriceRules } from '~/services/api/priceRules'

import { PurchaseSettingsPriceFields, PurchaseSettingsPriceFormData } from './PurchaseSettingsPriceFields'
import { RemovePriceRuleModal } from './RemovePriceRuleModal'

interface Props {
  children?: React.ReactNode
}

interface FormData {
  scopes: PurchaseSettingsPriceFormData[]
}

const schema = Yup.object({
  scopes: Yup.array().of(
    Yup.object({
      id: Yup.string().optional(),
      label: Yup.string().required('O nome da regra é obrigatório'),
      modality: Yup.string()
        .oneOf([...Object.values(PriceRuleModality)], 'A modalidade da regra inválida')
        .required('A modalidade é obrigatória'),
      type: Yup.string()
        .oneOf([...Object.values(PriceRuleType)], 'O tipo da regra é inválido')
        .required('O tipo é obrigatório'),
      value: Yup.number().required('O valor é obrigatório')
    })
  )
})

export const PurchaseSettingsPriceForm: React.FC<Props> = () => {
  const formRef = useRef<FormHandles>(null)
  const [scopes, setScopes] = useState([])

  const [removeId, setRemoveId] = useState(null)
  const [openRemoveModal, setOpenRemoveModal] = useState(false)

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const handleAddScope = useCallback(() => {
    setScopes(old => {
      return [...old, [, old.length]]
    })
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await listPriceRules()

    const data = response?.data || []
    const newScopes = data.map(({ id }, index) => [id, index])

    if (!data?.length) handleAddScope()
    else setScopes(newScopes)

    if (isMounted()) {
      setLoading(false)
      formRef.current?.setData?.({ scopes: data })
    }
  }, [isMounted, handleAddScope])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const isInvalid = await validateFormData(schema, data, formRef.current)
      if (isInvalid) return null

      await savePriceRules(data.scopes)
      fetchData()
    },
    [fetchData]
  )
  const handleToggleRemoveModal = () => setOpenRemoveModal(old => !old)

  const handleRemove = useCallback((id: number, index: number) => {
    if (!id) return setScopes(old => old.filter(([, i]) => i !== index))

    setRemoveId(id)
    handleToggleRemoveModal()
  }, [])

  return (
    <>
      <RemovePriceRuleModal
        id={removeId}
        onRemoveSuccess={fetchData}
        open={openRemoveModal}
        onToggle={handleToggleRemoveModal}
      />
      <Form ref={formRef} onSubmit={handleSubmit}>
        {scopes?.map(([id, index]) => {
          return <PurchaseSettingsPriceFields id={id} onRemove={handleRemove} key={`scope-${index}`} index={index} />
        })}
        <Grid container p={2}>
          <Button type="button" onClick={handleAddScope} fullWidth variant="outlined">
            Adicionar mais regras
          </Button>
        </Grid>
        <Grid container justifyContent="flex-end" py={2} px={1}>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Grid>
      </Form>

      {loading ? <CircleLoading /> : null}
    </>
  )
}
