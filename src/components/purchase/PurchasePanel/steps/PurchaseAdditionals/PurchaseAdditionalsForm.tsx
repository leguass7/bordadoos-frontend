import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Grid, TextField } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { Field } from '~/components/Form/Field'
import { Switch } from '~/components/Form/Switch'
import { formatPrice } from '~/helpers'
import { useHasAccess } from '~/hooks/useHasAccess'
import { useIsMounted } from '~/hooks/useIsMounted'
import {
  calculatePurchaseOriginalValue,
  calculatePurchaseTotalValue
} from '~/serverSide/purchases/purchase-configs/purchase-config.helper'
import { getConfig } from '~/services/api/config'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {
  onSuccess?: () => void
}

interface FormData {
  qtd?: number
  value?: number
  points?: number
}

export const PurchaseAdditionalsForm: React.FC<Props> = ({ onSuccess }) => {
  const { additionals, changeAdditionals, priceRules } = usePurchasePanelContext()
  const isAdmin = useHasAccess(8)

  const isMounted = useIsMounted()
  const formRef = useRef<FormHandles>(null)
  const [updated, setUpdated] = useState(false)

  const [purchaseRules, setPurchaseRules] = useState()

  const [unityValue, setUnityValue] = useState(formatPrice(0))
  const [totalPrice, setTotalPrice] = useState(formatPrice(0))

  const fetchPurchaseRules = useCallback(async () => {
    const response = await getConfig('purchaseRules')
    if (isMounted() && response?.data?.meta) setPurchaseRules(response.data.meta as any)
  }, [setPurchaseRules, isMounted])

  useEffect(() => {
    fetchPurchaseRules()
  }, [fetchPurchaseRules])

  const updateTotalPrice = useCallback(() => {
    if (!purchaseRules) return 0

    const data = formRef.current?.getData() as FormData
    const qtd = Number(data?.qtd) || 0
    const points = Number(data?.points) || 0

    const originalPrice = calculatePurchaseOriginalValue(qtd, points, purchaseRules)
    if (originalPrice) setUnityValue(formatPrice(originalPrice / qtd))
    const totalPrice = calculatePurchaseTotalValue(originalPrice, qtd, priceRules)

    setTotalPrice(formatPrice(totalPrice))
    formRef.current.setFieldValue('value', Number(totalPrice.toFixed(2)))
  }, [purchaseRules, priceRules])

  useEffect(() => {
    updateTotalPrice()
  }, [priceRules?.length, updateTotalPrice])

  const changeUnityValue = useCallback(e => setUnityValue(e.target.value), [])

  const updateForm = useCallback(() => {
    setUpdated(true)
    formRef.current.setData(additionals)
  }, [additionals])

  useEffect(() => {
    if (!updated) updateForm()
  }, [updateForm, updated])

  const handleSubmit = useCallback(
    (data: FormData) => {
      changeAdditionals(data)
      onSuccess?.()
    },
    [changeAdditionals, onSuccess]
  )

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Field name="qtd" number int label="Qtd. de peças" autoComplete="off" onChange={updateTotalPrice} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="points"
            number
            int
            label="Qtd. de pontos do bordado"
            onChange={updateTotalPrice}
            autoComplete="off"
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
              <Field fullWidth name="value" number label="Total" autoComplete="off" />
            ) : (
              <TextField style={{ padding: 4 }} value={totalPrice} disabled={true} label="Valor total" fullWidth />
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container pt={3} direction="column" alignItems="flex-start">
        <Switch label="pago" name="paid" />
        <Switch label="finalizado" name="done" />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Button type="submit" variant="contained">
          Salvar
        </Button>
      </Grid>
    </Form>
  )
}
