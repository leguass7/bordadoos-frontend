import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Grid, TextField } from '@mui/material'

import { Field } from '~/components/Form/react-hook-form/Field'
import { Switch } from '~/components/Form/react-hook-form/Switch'
import { formatPrice } from '~/helpers'
import { useHasAccess } from '~/hooks/useHasAccess'
import { useIsMounted } from '~/hooks/useIsMounted'
import {
  calculatePurchaseOriginalValue,
  calculatePurchaseTotalValue
} from '~/serverSide/purchases/purchase-configs/purchase-config.helper'
import { getConfig } from '~/services/api/config'

import { PurchaseAdditionals, usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {
  onSuccess?: () => void
  purchaseId?: number
}

const defaultValues: PurchaseAdditionals = {
  developmentPrice: 35
}

export const PurchaseAdditionalsForm: React.FC<Props> = ({ onSuccess }) => {
  const { additionals, changeAdditionals, priceRules } = usePurchasePanelContext()

  const [unityValue, setUnityValue] = useState(formatPrice(0))
  const [purchaseRules, setPurchaseRules] = useState()

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isDirty }
  } = useForm<PurchaseAdditionals>({ defaultValues })
  const isAdmin = useHasAccess(8)
  const isMounted = useIsMounted()

  const updateForm = useCallback(() => {
    if (!isDirty) reset({ ...additionals })
  }, [additionals, isDirty, reset])

  useEffect(() => {
    updateForm()
  }, [updateForm])

  const fetchPurchaseRules = useCallback(async () => {
    const response = await getConfig('purchaseRules')
    if (isMounted() && response?.data?.meta) setPurchaseRules(response.data.meta as any)
  }, [setPurchaseRules, isMounted])

  useEffect(() => {
    fetchPurchaseRules()
  }, [fetchPurchaseRules])

  const updateTotalPrice = useCallback(() => {
    if (!purchaseRules) return 0

    const data = getValues()
    const qtd = Number(data?.qtd) || 1
    const points = Number(data?.points) || 0
    const developmentPrice = Number(data?.developmentPrice) || 0

    const originalPrice = calculatePurchaseOriginalValue(qtd, points, developmentPrice, purchaseRules)
    const priceWithoutDevelopment = originalPrice - developmentPrice

    if (originalPrice) setUnityValue(formatPrice(priceWithoutDevelopment / qtd))
    const totalPrice = calculatePurchaseTotalValue(originalPrice, qtd, priceRules)

    setValue('value', Number(totalPrice.toFixed(2)))
  }, [purchaseRules, priceRules, getValues, setValue])

  useEffect(() => {
    updateTotalPrice()
  }, [priceRules?.length, updateTotalPrice])

  const changeUnityValue = useCallback(e => setUnityValue(e.target?.value || 0), [])

  const onSubmit = useCallback(
    async (formData: PurchaseAdditionals) => {
      changeAdditionals(formData)
      onSuccess?.()
    },
    [changeAdditionals, onSuccess]
  )

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Field
              onBlur={handleSubmit(onSubmit)}
              control={control}
              name="developmentPrice"
              number
              label="Taxa de desenvolvimento"
              autoComplete="off"
              onChange={updateTotalPrice}
            />
          </Grid>
          <Grid item sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Field
              onBlur={handleSubmit(onSubmit)}
              control={control}
              name="qtd"
              number
              int
              label="Qtd. de peças"
              autoComplete="off"
              onChange={updateTotalPrice}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              onBlur={handleSubmit(onSubmit)}
              control={control}
              name="points"
              number
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
              <Field
                control={control}
                onBlur={handleSubmit(onSubmit)}
                fullWidth
                name="value"
                number
                label="Total"
                autoComplete="off"
                disabled={!isAdmin()}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container pt={3} direction="column" alignItems="flex-start">
          <Switch onChange={handleSubmit(onSubmit)} control={control} label="pago" name="paid" />
          <Switch onChange={handleSubmit(onSubmit)} control={control} label="finalizado" name="done" />
        </Grid>
      </form>
    </div>
  )
}
