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

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryColorForm: React.FC<Props> = ({ onSuccess }) => {
  const { embroidery, changeEmbroidery, isEditing } = usePurchasePanelContext()
  const formRef = useRef<HTMLFormElement>(null)

  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<PurchaseEmbroideryColorFormFields>()

  const { fields, append, remove } = useFieldArray({
    name: 'colors',
    control
  })

  const updateForm = useCallback(() => {
    if (!isDirty) {
      const colors = [...(embroidery?.colors ?? [])]

      if (colors.length)
        colors.forEach(c => {
          append(c)
        })
      else if (!isEditing && !colors?.length) append({ colors: [], label: '' })
    }
  }, [embroidery, append, isDirty, isEditing])

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
