import { useCallback, useMemo, useRef } from 'react'

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

  const clientId = useMemo(() => info?.clientId, [info])

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
        <Grid item xs={12}>
          <Field multiline minRows={4} disabled={!clientId} label="Observações para o cliente" name="clientObs" />
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
