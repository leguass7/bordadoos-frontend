import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Grid } from '@mui/material'
import { EmbroideryPosition, EmbroideryType } from '@prisma/client'

import { CircleLoading } from '~/components/CircleLoading'
import { Field } from '~/components/Form/react-hook-form/Field'
import { IOptionProps, Select } from '~/components/Form/react-hook-form/Select'
import { SelectItem } from '~/components/Form/Select'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getPositionByType } from '~/services/api/embroidery'
import { findPurchaseWithItems } from '~/services/api/purchase'

import { PurchaseEmbroidery, usePurchasePanelContext } from '../../PurchasePanelProvider'

function selectItemsDto(data: EmbroideryPosition[] | EmbroideryType[]): SelectItem[] {
  return data
    .filter(item => item?.actived)
    .map(({ id, label = '' }) => {
      return { label, value: id }
    })
}

interface FormData extends PurchaseEmbroidery {}

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryForm: React.FC<Props> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty }
  } = useForm<FormData>()

  const { changeEmbroidery, embroidery } = usePurchasePanelContext()

  const [initialEmbroidery] = useState(embroidery)

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const [typeItems, setTypeItems] = useState<IOptionProps[]>([])
  const [positionItems, setPositionItems] = useState<IOptionProps[]>([
    { label: 'Selecione um tipo de bordado primeiro', value: '', disabled: true }
  ])

  const updateForm = useCallback(() => {
    if (isDirty) return

    if (embroidery?.typeId) {
      const hasItems = typeItems?.length && positionItems?.length
      if (hasItems && isMounted()) reset({ ...embroidery })
    } else reset({ ...embroidery })
  }, [reset, typeItems, positionItems, isDirty, isMounted, embroidery])

  useEffect(() => {
    updateForm()
  }, [updateForm, initialEmbroidery])

  const fetchData = useCallback(async () => {
    if (typeItems?.length) return null

    setLoading(true)
    const { types } = await findPurchaseWithItems()
    if (isMounted()) {
      setLoading(false)
      if (types) setTypeItems(selectItemsDto(types))
    }
  }, [isMounted, typeItems])

  const updatePositionItems = useCallback(
    async (value: number) => {
      setLoading(true)

      const { success, positions } = await getPositionByType(value)
      if (isMounted()) {
        setLoading(false)
        if (success) setPositionItems(selectItemsDto(positions))
      }
    },
    [isMounted]
  )

  useEffect(() => {
    if (embroidery?.typeId) updatePositionItems(embroidery?.typeId)
  }, [updatePositionItems, embroidery?.typeId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onSubmit = useCallback(
    (formData: PurchaseEmbroidery) => {
      changeEmbroidery(formData)
      if (onSuccess) onSuccess()
    },
    [onSuccess, changeEmbroidery]
  )

  const handleChangeType = useCallback(
    async e => {
      const value = parseInt(`${e.target?.value || 0}`) || 0
      if (value) {
        setValue('categoryId', '' as any)
        // formRef.current.setFieldValue('categoryId', '')
        updatePositionItems(value)
      }
      handleSubmit(onSubmit)(e)
    },
    [updatePositionItems, setValue, handleSubmit, onSubmit]
  )

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <Field
              onBlur={handleSubmit(onSubmit)}
              control={control}
              error={errors?.label}
              name="label"
              label="Nome do bordado"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              control={control}
              options={typeItems}
              onChange={handleChangeType}
              label="Tipo de bordado"
              error={errors?.typeId}
              name="typeId"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              control={control}
              options={positionItems}
              onChange={handleSubmit(onSubmit)}
              label="Posição do bordado"
              error={errors?.categoryId}
              name="categoryId"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              onBlur={handleSubmit(onSubmit)}
              control={control}
              error={errors?.description}
              name="description"
              label="Descrição"
              multiline
              minRows={3}
            />
          </Grid>
        </Grid>
        {loading ? <CircleLoading /> : null}
      </form>
    </div>
  )
}
