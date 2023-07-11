import { useCallback, useEffect, useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@mui/material'

import { usePurchasePanelContext } from '../../../PurchasePanelProvider'
import { PurchaseEmbroideryColorFormScope } from './PurchaseEmbroideryColorFormScope'

interface Color {
  label: string
  colors: string[]
}

export interface PurchaseEmbroideryColorFormFields {
  colors: Color[]
}

const defaultColor = { colors: [], label: '' }

interface Props {
  onSuccess?: () => void
  purchaseId?: number
}

export const PurchaseEmbroideryColorForm: React.FC<Props> = ({ onSuccess, purchaseId }) => {
  const { embroidery, changeEmbroidery, updated, isEditing } = usePurchasePanelContext()
  const formRef = useRef<HTMLFormElement>(null)

  const { control, handleSubmit } = useForm<PurchaseEmbroideryColorFormFields>()

  const { fields, append, remove } = useFieldArray({
    name: 'colors',
    control
  })

  const updateForm = useCallback(() => {
    if (!purchaseId) {
      append(defaultColor)
      return
    }

    const colors = [...(embroidery?.colors ?? [])]

    if (updated && colors?.length)
      colors.forEach(c => {
        append(c)
      })
  }, [embroidery?.colors, append, updated, purchaseId])

  useEffect(() => {
    updateForm()
  }, [updateForm])

  const onSubmit = useCallback(
    async ({ colors }: PurchaseEmbroideryColorFormFields) => {
      const cleanedColors = colors.map(c => {
        const cleaned = c.colors.filter(s => s !== '' && s !== 'temp')
        c.colors = cleaned
        return c
      })

      changeEmbroidery({ colors: cleanedColors })
      onSuccess?.()
    },
    [changeEmbroidery, onSuccess]
  )

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Button variant="outlined" onClick={() => append({ label: '', colors: [''] })}>
          Adicionar mais cores
        </Button>
        <br />
        <br />
        {fields?.map(({ id }, index) => {
          return (
            <PurchaseEmbroideryColorFormScope
              control={control}
              onRemove={remove}
              handleSubmit={handleSubmit(onSubmit)}
              index={index}
              id={id}
              key={id}
            />
          )
        })}
      </form>
    </div>
  )
}
