import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Grid } from '@mui/material'
import { EmbroideryPosition, EmbroideryType, Purchase } from '@prisma/client'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { validateFormData } from '~/helpers/form'
import { removeInvalidValues } from '~/helpers/object'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getPositionByType } from '~/services/api/embroidery'
import { findPurchaseWithItems } from '~/services/api/purchase'

import { CircleLoading } from '../CircleLoading'
import { Datepicker } from '../Form/Datepicker'
import { Input } from '../Form/Input'
import Select, { SelectItem } from '../Form/Select'
import { Switch } from '../Form/Switch'
import { usePurchase } from './PurchaseProvider'

const schema = Yup.object().shape({
  qtd: Yup.string().required('A quantidade de peças é obrigatória'),
  value: Yup.string(),
  paid: Yup.bool(),
  typeId: Yup.string().required('O tipo do bordado é obrigatório'),
  categoryId: Yup.string(),
  done: Yup.bool(),
  deliveryDate: Yup.string().nullable() // lembrete: Validar formato de data
})

interface Props {
  purchaseId?: number
  initialData?: Partial<Purchase>
  onSubmit: (formData: Purchase, creating?: boolean) => Promise<void>
}

function selectItemsDto(data: EmbroideryPosition[] | EmbroideryType[]): SelectItem[] {
  return data
    .filter(item => item?.actived)
    .map(({ id, label = '' }) => {
      return { label, value: id }
    })
}

export const PurchaseForm: React.FC<Props> = ({ initialData = {}, purchaseId = 0, onSubmit }) => {
  const formRef = useRef<FormHandles>(null)
  const { clientId, updatePurchase } = usePurchase()

  const [typeItems, setTypeItems] = useState<SelectItem[]>([])
  const [positionItems, setPositionItems] = useState<SelectItem[]>([])

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { purchase, categories, types } = await findPurchaseWithItems(purchaseId)
    if (isMounted()) {
      setLoading(false)

      if (types) setTypeItems(selectItemsDto(types))
      if (categories) setPositionItems(selectItemsDto(categories))

      formRef?.current?.setData?.(purchase)
      updatePurchase({ clientId: purchase?.clientId })
    }
  }, [isMounted, purchaseId, updatePurchase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleChangeType = useCallback(
    async e => {
      const value = parseInt(`${e.target?.value || 0}`) || 0
      if (value) {
        setLoading(true)
        const { success, positions } = await getPositionByType(value)
        if (isMounted()) {
          setLoading(false)
          if (success) setPositionItems(selectItemsDto(positions))
        }
      }
    },
    [isMounted]
  )

  const handleSubmit = useCallback(
    async data => {
      const isInvalid = await validateFormData(schema, data, formRef.current)
      if (isInvalid) return

      setLoading(true)
      if (onSubmit) await onSubmit(removeInvalidValues({ ...data, clientId }), !purchaseId)

      if (!!isMounted()) {
        setLoading(false)

        if (!purchaseId) {
          formRef?.current?.setData?.({})
          formRef.current?.reset?.({})
        }
      }
    },
    [isMounted, purchaseId, onSubmit, clientId]
  )

  return (
    <>
      <Grid container direction="column" flex={1}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Grid container p={1}>
            <Grid item xs={12} sm={6}>
              <Select
                disabled={!clientId}
                items={typeItems}
                onChange={handleChangeType}
                label="Tipo de bordado"
                name="typeId"
              />
              <Select disabled={!clientId} items={positionItems} label="Categoria do bordado" name="categoryId" />
              <Datepicker disabled={!clientId} name="deliveryDate" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input disabled={!clientId} number int name="qtd" label="Quantidade" autoComplete="off" />
              <Input disabled={!clientId} number name="value" label="Valor unitário" autoComplete="off" />
            </Grid>
            <Grid container direction="column" alignItems="flex-start">
              <Switch disabled={!clientId} label="pago" name="paid" />
              <Switch disabled={!clientId} label="finalizado" name="done" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" type="submit" disabled={!clientId}>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Grid>

      {loading ? <CircleLoading light /> : null}
    </>
  )
}
