import { useCallback, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Button, Grid } from '@mui/material'

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
  const { embroidery, changeEmbroidery } = usePurchasePanelContext()
  const { control, handleSubmit } = useForm<PurchaseEmbroideryColorFormFields>({
    defaultValues: { colors: embroidery?.colors }
  })
  const { fields, append, remove } = useFieldArray({
    name: 'colors',
    control
  })

  useEffect(() => {
    if (!fields?.length) append({ label: '', colors: [''] })
  }, [append, fields])

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
