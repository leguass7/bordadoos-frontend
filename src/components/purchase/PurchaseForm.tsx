import { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { Grid } from '@mui/material'
import { Purchase } from '@prisma/client'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { validateFormData } from '~/helpers/form'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getDefault, postDefault, putDefault } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { DrawerCustomer } from '../Drawers/DrawerCustomer'
import { DrawerEmbroideryPosition } from '../Drawers/DrawerEmbroideryPosition'
import { DrawerEmbroideryType } from '../Drawers/DrawerEmbroideryType'
import { Datepicker } from '../Form/Datepicker'
import { Input } from '../Form/Input'
import { Switch } from '../Form/Switch'
import { PurchaseActions, PurchaseActionSelect } from './PurchaseActions'
import { PurchaseWithRelations } from './PurchaseList'
import { usePurchase } from './PurchaseProvider'

const schema = Yup.object().shape({
  clientName: Yup.string().required('O cliente é obrigatório'),
  categoryLabel: Yup.string().required('A posição do bordado é obrigatória'),
  typeLabel: Yup.string().required('O tipo de bordado é obrigatório'),
  qtd: Yup.string().required('A quantidade de peças é obrigatória'),
  value: Yup.string().required('O valor unitário é obrigatório'),
  paid: Yup.bool().required('O cliente é obrigatório'),
  done: Yup.bool().required('O cliente é obrigatório'),
  deliveryDate: Yup.string().required('Data de entrega é obrigatória') // lembrete: Validar formato de data
})

interface Props {
  purchaseId?: number
  initialData?: Partial<Purchase>
}

export const PurchaseForm: React.FC<Props> = ({ initialData = {}, purchaseId = 0 }) => {
  const formRef = useRef<FormHandles>(null)
  const { updatePurchase } = usePurchase()
  const [showDrawer, setshowDrawer] = useState(0)
  const { push } = useRouter()

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const updateForm = useCallback(
    (data: any) => {
      formRef?.current?.setData?.(data)
      updatePurchase(data)
    },
    [updatePurchase]
  )

  const fetchData = useCallback(async () => {
    if (purchaseId) {
      setLoading(true)
      const { purchase, success } = await getDefault<{ purchase: PurchaseWithRelations }>(`/purchases/${purchaseId}`)
      if (isMounted?.current) {
        setLoading(false)
        if (success) {
          // TEMP
          const data = {
            ...purchase,
            clientName: purchase?.client?.name,
            typeLabel: purchase?.type?.label,
            categoryLabel: purchase?.category?.label
          }

          updateForm(data)
        }
      }
    }
  }, [isMounted, purchaseId, updateForm])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    async data => {
      const isInValid = await validateFormData(schema, data, formRef.current)
      if (isInValid) return

      // TEMP
      if (data?.clientName) delete data?.clientName
      if (data?.typeLabel) delete data?.typeLabel
      if (data?.categoryLabel) delete data?.categoryLabel

      setLoading(true)
      if (purchaseId) {
        const { success } = await putDefault<{}>(`/purchases/${purchaseId}`, data)
        if (success) push('/admin/purchases')
      } else await postDefault(`/purchases`, data)

      if (isMounted.current) {
        setLoading(false)
        updateForm({})
        formRef.current?.reset?.({})
      }
    },
    [isMounted, updateForm, purchaseId, push]
  )

  const handleAction = useCallback((type: PurchaseActionSelect) => {
    if (type === PurchaseActionSelect['client']) setshowDrawer(1)
    if (type === PurchaseActionSelect['type']) setshowDrawer(2)
    if (type === PurchaseActionSelect['category']) setshowDrawer(3)
  }, [])

  const cancelDrawer = useCallback(() => {
    setshowDrawer(0)
  }, [])

  const handleSelect = useCallback(
    (fieldId: string, fieldName: string) => (id: number, label: string) => {
      // FIXME: name fields
      cancelDrawer()
      const aux: any = {}
      aux[fieldId] = id
      if (aux[fieldId]) aux[fieldName] = label
      updateForm(aux)
    },
    [updateForm, cancelDrawer]
  )

  return (
    <>
      <Grid container direction="column" flex={1}>
        <Grid item flex={1} p={1}>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            <Grid container>
              <Grid item xs={12} md={6} lg={4}>
                <Input name="clientName" placeholder="Cliente" disabled />
                <Input name="typeLabel" placeholder="Bordado" disabled />
                <Input name="categoryLabel" placeholder="Posição" disabled />

                <Input style={{ display: 'none' }} name="clientId" />
                <Input style={{ display: 'none' }} name="typeId" />
                <Input style={{ display: 'none' }} name="categoryId" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Input number name="qtd" placeholder="Quantidade" autoComplete="off" />
                <Input number name="value" placeholder="Valor unitário" autoComplete="off" />
              </Grid>
              <Grid item xs={12} md={6} lg={4} alignItems="flex-start">
                <Datepicker name="deliveryDate" />
              </Grid>
              <Grid container direction="column" alignItems="flex-start">
                <Switch label="pago" name="paid" />
                <Switch label="finalizado" name="done" />
              </Grid>
            </Grid>
          </Form>
        </Grid>
        <Grid item p={1}>
          <PurchaseActions onSelect={handleAction} onSave={formRef.current?.submitForm} />
        </Grid>
      </Grid>
      <DrawerCustomer
        onSelecCustomer={handleSelect('clientId', 'clientName')}
        open={showDrawer === 1}
        onClose={cancelDrawer}
      />
      <DrawerEmbroideryType
        onSelect={handleSelect('typeId', 'typeLabel')}
        open={showDrawer === 2}
        onClose={cancelDrawer}
      />
      <DrawerEmbroideryPosition
        onSelect={handleSelect('categoryId', 'categoryLabel')}
        open={showDrawer === 3}
        onClose={cancelDrawer}
      />

      {loading ? <CircleLoading light /> : null}
    </>
  )
}