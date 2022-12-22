import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'
import { EmbroideryPosition, EmbroideryType, Purchase } from '@prisma/client'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { formatPrice } from '~/helpers'
import { validateFormData } from '~/helpers/form'
import { removeInvalidValues } from '~/helpers/object'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getPositionByType } from '~/services/api/embroidery'
import { findPurchaseWithItems } from '~/services/api/purchase'

import { CircleLoading } from '../CircleLoading'
import { Datepicker } from '../Form/Datepicker'
import { Field } from '../Form/Field'
import Select, { SelectItem } from '../Form/Select'
import { Switch } from '../Form/Switch'
import { usePurchase } from './PurchaseProvider'

const schema = Yup.object().shape({
  qtd: Yup.string().required('A quantidade de bordados é obrigatória'),
  value: Yup.string().required('O valor do pedido é obrigatório'),
  paid: Yup.bool(),
  typeId: Yup.string().required('O tipo do bordado é obrigatório'),
  label: Yup.string(),
  description: Yup.string(),
  points: Yup.string().default('0'),
  categoryId: Yup.string().required('A categoria do bordado é obrigatória'),
  done: Yup.bool(),
  entryDate: Yup.string().nullable(),
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
  const { clientId, updatePurchase, ruleIds } = usePurchase()

  const [typeItems, setTypeItems] = useState<SelectItem[]>([])
  const [positionItems, setPositionItems] = useState<SelectItem[]>([])

  const [totalPrice, setTotalPrice] = useState(formatPrice(0))

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const updateTotalPrice = useCallback(() => {
    const data = formRef.current?.getData()

    const [qtd = 0, value = 0] = [data['qtd'], data['value']]
    const total = qtd * value

    setTotalPrice(formatPrice(total))
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { purchase, categories, types } = await findPurchaseWithItems(purchaseId)
    if (isMounted()) {
      setLoading(false)

      if (types) setTypeItems(selectItemsDto(types))
      if (categories) setPositionItems(selectItemsDto(categories))

      formRef?.current?.setData?.(purchase)
      updateTotalPrice()
      updatePurchase({ clientId: purchase?.clientId })
    }
  }, [isMounted, purchaseId, updatePurchase, updateTotalPrice])

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
      if (onSubmit) await onSubmit(removeInvalidValues({ ...data, clientId, rules: ruleIds }), !purchaseId)

      if (!!isMounted()) {
        setLoading(false)

        if (!purchaseId) {
          formRef?.current?.setData?.({})
          formRef.current?.reset?.({})
          setTotalPrice(formatPrice(0))
        }
      }
    },
    [isMounted, purchaseId, onSubmit, clientId, ruleIds]
  )

  return (
    <>
      <Grid container direction="column" flex={1}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Grid container py={2} px={1}>
            <Typography variant="h5" pb={2} pl={1}>
              Informações do pedido
            </Typography>
            <Grid item xs={12}>
              <Field name="label" disabled={!clientId} label="Nome da borda" autoComplete="off" />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Datepicker disabled={!clientId} label="data de entrada" name="entryDate" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Datepicker disabled={!clientId} name="deliveryDate" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Field name="description" disabled={!clientId} label="Descrição" multiline minRows={3} />
            </Grid>
          </Grid>
          {/* <Divider sx={{ width: '100%', bgcolor: 'GrayText', opacity: 0.8, marginY: 2 }} /> */}
          <Grid container p={1}>
            <Grid item xs={12}>
              <Typography variant="h5" pb={2} pl={1}>
                Informações do bordado
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                disabled={!clientId}
                items={typeItems}
                onChange={handleChangeType}
                label="Tipo de bordado"
                name="typeId"
              />
              <Select disabled={!clientId} items={positionItems} label="Categoria do bordado" name="categoryId" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                disabled={!clientId}
                number
                int
                name="qtd"
                label="Quantidade"
                autoComplete="off"
                onChange={updateTotalPrice}
              />
              <Field
                disabled={!clientId}
                number
                name="value"
                label="Valor unitário"
                autoComplete="off"
                onChange={updateTotalPrice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field disabled={!clientId} number int name="points" label="Quantidade de pontos" autoComplete="off" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ padding: 4 }}>
                <TextField value={totalPrice} disabled={true} label="total" fullWidth />
              </div>
            </Grid>
            {/* <Divider sx={{ width: '100%', bgcolor: 'GrayText', opacity: 0.8, marginY: 2 }} /> */}
            <Grid container pt={3} direction="column" alignItems="flex-start">
              <Switch disabled={!clientId} label="pago" name="paid" />
              <Switch disabled={!clientId} label="finalizado" name="done" />
            </Grid>
            <Grid item xs={12} md={6} pt={2}>
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
