import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'
import { EmbroideryPosition, EmbroideryType, Purchase } from '@prisma/client'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { formatPrice } from '~/helpers'
import { validateFormData } from '~/helpers/form'
import { removeInvalidValues } from '~/helpers/object'
import { useHasAccess } from '~/hooks/useHasAccess'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getPositionByType } from '~/services/api/embroidery'
import { findPurchaseWithItems } from '~/services/api/purchase'

import {
  calculatePurchaseOriginalValue,
  calculatePurchaseTotalValue
} from '../../serverSide/purchases/purchase-configs/purchase-config.helper'
import { CircleLoading } from '../CircleLoading'
import { Datepicker } from '../Form/Datepicker'
import { Field } from '../Form/Field'
import Select, { SelectItem } from '../Form/Select'
import { Switch } from '../Form/Switch'
import { usePurchase, usePurchaseRules } from './PurchaseProvider'

const schema = Yup.object().shape({
  qtd: Yup.string().required('A quantidade de bordados é obrigatória'),
  value: Yup.string(),
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

interface FormData {
  qtd: number
  value: number
  paid?: boolean
  typeId: string
  label?: string
  description?: string
  points?: number
  categoryId: string
  done?: boolean
  entryDate?: string
  deliveryDate?: string
}

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
  const { rulesSelected, fetchPurchaseRules, purchaseRules, ruleIds, setRulesSelected } = usePurchaseRules()
  const isAdmin = useHasAccess(8)

  const [unityValue, setUnityValue] = useState(formatPrice(0))

  const [typeItems, setTypeItems] = useState<SelectItem[]>([])
  const [positionItems, setPositionItems] = useState<SelectItem[]>([])

  const [totalPrice, setTotalPrice] = useState(formatPrice(0))

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const updateTotalPrice = useCallback(() => {
    if (!purchaseRules) return 0

    const data = formRef.current?.getData() as FormData
    const qtd = Number(data?.qtd) || 0
    const points = Number(data?.points) || 0

    const originalPrice = calculatePurchaseOriginalValue(qtd, points, purchaseRules)
    if (originalPrice) setUnityValue(formatPrice(originalPrice / qtd))
    const totalPrice = calculatePurchaseTotalValue(originalPrice, qtd, rulesSelected)

    setTotalPrice(formatPrice(totalPrice))
    formRef.current.setFieldValue('value', Number(totalPrice.toFixed(2)))
  }, [purchaseRules, rulesSelected])

  useEffect(() => {
    updateTotalPrice()
  }, [rulesSelected?.length, updateTotalPrice])

  useEffect(() => {
    if (!purchaseRules) fetchPurchaseRules()
  }, [fetchPurchaseRules, purchaseRules])

  const fetchData = useCallback(async () => {
    if (typeItems?.length) return null

    setLoading(true)
    const { purchase, categories, types } = await findPurchaseWithItems(purchaseId)
    if (isMounted()) {
      setLoading(false)

      if (types) setTypeItems(selectItemsDto(types))
      if (categories) setPositionItems(selectItemsDto(categories))

      if (purchase) formRef?.current?.setData?.(purchase)
      updateTotalPrice()
      if (purchase?.clientId) updatePurchase({ clientId: purchase?.clientId })
    }
  }, [isMounted, purchaseId, updateTotalPrice, typeItems, updatePurchase])

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
    async (data: FormData) => {
      const isInvalid = await validateFormData(schema, data, formRef.current)
      if (isInvalid) return

      setLoading(true)
      if (onSubmit) await onSubmit(removeInvalidValues({ ...data, clientId, rules: ruleIds }), !purchaseId)

      if (isMounted()) {
        setLoading(false)

        setRulesSelected([])
        if (!purchaseId) {
          formRef?.current?.setData?.({})
          setTotalPrice(formatPrice(0))
          setUnityValue(formatPrice(0))
        }
      }
    },
    [isMounted, purchaseId, onSubmit, clientId, ruleIds, setRulesSelected]
  )

  const changeUnityValue = useCallback(e => setUnityValue(e.target.value), [])

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
                  <Datepicker disabled={!clientId || !isAdmin()} label="data de entrada" name="entryDate" />
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select disabled={!clientId} items={positionItems} label="Categoria do bordado" name="categoryId" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                disabled={!clientId}
                onChange={updateTotalPrice}
                number
                int
                name="points"
                label="Quantidade de pontos"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                disabled={!clientId}
                number
                int
                name="qtd"
                label="Quantidade de bordados"
                autoComplete="off"
                onChange={updateTotalPrice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ padding: 4 }}>
                <TextField
                  fullWidth
                  disabled={true}
                  value={unityValue}
                  label="Valor unitário"
                  autoComplete="off"
                  onChange={changeUnityValue}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                {isAdmin() ? (
                  <Field fullWidth disabled={!clientId} name="value" number label="Total" autoComplete="off" />
                ) : (
                  <TextField style={{ padding: 4 }} value={totalPrice} disabled={true} label="Total" fullWidth />
                )}
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
