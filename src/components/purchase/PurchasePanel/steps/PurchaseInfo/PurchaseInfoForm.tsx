import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Grid } from '@mui/material'
import { Form } from '@unform/web'

import { Datepicker } from '~/components/Form/react-hook-form/Datepicker'
import { Field } from '~/components/Form/react-hook-form/Field'

import { PurchasePanelInfo, usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {
  onSuccess?: () => void
}

const defaultValues: PurchasePanelInfo = {
  entryDate: new Date()
}

export const PurchaseInfoForm: React.FC<Props> = ({ onSuccess }) => {
  const { changeInfo, info } = usePurchasePanelContext()
  const {
    control,
    reset,
    getFieldState,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<PurchasePanelInfo>()

  const updateForm = useCallback(() => {
    reset({ ...defaultValues, ...info })
  }, [info, reset])

  useEffect(() => {
    updateForm()
  }, [updateForm])

  const onSubmit = useCallback(
    (data: PurchasePanelInfo) => {
      changeInfo(data)
      onSuccess?.()
    },
    [changeInfo, onSuccess]
  )

  useEffect(() => {
    onSubmit?.(getValues())
  }, [onSubmit, getValues])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Datepicker
            control={control}
            error={errors.entryDate}
            onChange={handleSubmit(onSubmit)}
            label="data de entrada"
            name="entryDate"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Datepicker
            control={control}
            error={errors.deliveryDate}
            onChange={handleSubmit(onSubmit)}
            name="deliveryDate"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            control={control}
            error={errors?.clientObs}
            onBlur={handleSubmit(onSubmit)}
            multiline
            label="Observações (cliente)"
            name="clientObs"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            control={control}
            error={errors?.employeeObs}
            onBlur={handleSubmit(onSubmit)}
            multiline
            label="Observações (operador)"
            name="employeeObs"
          />
        </Grid>
        {/* <Grid item xs={12} p={1}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid> */}
      </Grid>
    </Form>
  )
}
