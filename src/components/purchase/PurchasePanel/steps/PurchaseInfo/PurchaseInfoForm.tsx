import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Button, Grid } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { Datepicker } from '~/components/Form/Datepicker'
import { Field } from '~/components/Form/Field'

import { PurchasePanelInfo, usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {
  onSuccess?: () => void
}

const initialData: PurchasePanelInfo = {
  entryDate: new Date()
}

export const PurchaseInfoForm: React.FC<Props> = ({ onSuccess }) => {
  const formRef = useRef<FormHandles>(null)
  const { info, changeInfo } = usePurchasePanelContext()

  const [localInfo] = useState(info)

  const clientId = useMemo(() => info?.clientId, [info])

  const autoUpdate = useCallback(() => {
    const data = { ...initialData, ...localInfo }
    changeInfo(data)
    formRef.current.setData(data)
  }, [changeInfo, localInfo])

  useEffect(() => {
    autoUpdate()
  }, [autoUpdate])

  const handleSubmit = useCallback(
    (data: PurchasePanelInfo) => {
      changeInfo(data)
      onSuccess?.()
    },
    [changeInfo, onSuccess]
  )

  return (
    <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Datepicker disabled={!clientId} label="data de entrada" name="entryDate" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Datepicker disabled={!clientId} name="deliveryDate" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field multiline disabled={!clientId} label="Observações para o cliente" name="clientObs" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field multiline disabled={!clientId} label="Observações internas" name="employeeObs" />
        </Grid>
        <Grid item xs={12} p={1}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}
