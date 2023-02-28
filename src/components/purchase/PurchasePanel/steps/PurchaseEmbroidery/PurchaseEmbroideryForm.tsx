import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Button, ButtonGroup, Grid } from '@mui/material'
import { EmbroideryPosition, EmbroideryType } from '@prisma/client'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { CircleLoading } from '~/components/CircleLoading'
import { Field } from '~/components/Form/Field'
import Select, { SelectItem } from '~/components/Form/Select'
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

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryForm: React.FC<Props> = ({ onSuccess }) => {
  const formRef = useRef<FormHandles>(null)
  const { embroidery, changeEmbroidery } = usePurchasePanelContext()

  const [localEmbroidery] = useState(embroidery)

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const [typeItems, setTypeItems] = useState<SelectItem[]>([])
  const [positionItems, setPositionItems] = useState<SelectItem[]>([
    { label: 'Selecione um tipo de bordado primeiro', value: '', disabled: true }
  ])

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

  const canUpdateForm = useMemo(() => {
    const typeId = localEmbroidery.typeId

    const noPositionItems = typeId && !positionItems?.[0]?.value
    if (noPositionItems) updatePositionItems(parseInt(`${typeId}`))

    let canUpdate = !!typeItems?.length
    if (typeId) canUpdate = canUpdate && !!positionItems?.[0]?.value

    return canUpdate
  }, [typeItems?.length, positionItems, localEmbroidery, updatePositionItems])

  const updateForm = useCallback(() => {
    if (canUpdateForm) formRef.current.setData({ ...localEmbroidery })
  }, [canUpdateForm, localEmbroidery])

  useEffect(() => {
    updateForm()
  }, [updateForm])

  const fetchData = useCallback(async () => {
    if (typeItems?.length) return null

    setLoading(true)
    const { types } = await findPurchaseWithItems()
    if (isMounted()) {
      setLoading(false)
      if (types) setTypeItems(selectItemsDto(types))
    }
  }, [isMounted, typeItems])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = useCallback(
    (formData: PurchaseEmbroidery) => {
      changeEmbroidery(formData)
      onSuccess?.()
    },
    [changeEmbroidery, onSuccess]
  )

  const handleChangeType = useCallback(
    async e => {
      const value = parseInt(`${e.target?.value || 0}`) || 0
      if (value) {
        formRef.current.setFieldValue('categoryId', '')
        updatePositionItems(value)
      }
    },
    [updatePositionItems]
  )

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Field name="label" label="Nome do bordado" autoComplete="off" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select items={typeItems} onChange={handleChangeType} label="Tipo de bordado" name="typeId" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select items={positionItems} label="Posição do bordado" name="categoryId" />
        </Grid>
        <Grid item xs={12}>
          <Field name="description" label="Descrição" multiline minRows={3} />
        </Grid>

        <Grid item xs={12} p={1}>
          <Grid container justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {loading ? <CircleLoading /> : null}
    </Form>
  )
}
