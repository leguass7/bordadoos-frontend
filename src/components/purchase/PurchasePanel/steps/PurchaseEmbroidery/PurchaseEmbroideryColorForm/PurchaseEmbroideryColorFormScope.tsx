import { FormEventHandler, useCallback, useEffect } from 'react'
import { Control, useFieldArray } from 'react-hook-form'

import { Add, Close } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'

import { Field } from '~/components/Form/react-hook-form/Field'

import { PurchaseEmbroideryColorFormFields } from '.'

interface Props {
  id: string
  index: number
  onRemove: (index: number | number[]) => void
  control: Control<PurchaseEmbroideryColorFormFields>
  handleSubmit: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const PurchaseEmbroideryColorFormScope: React.FC<Props> = ({ id, index, control, onRemove, handleSubmit }) => {
  const { append, fields, update } = useFieldArray({ control, name: `colors.${index}.colors` as 'colors' })

  const handleAddColor = useCallback(() => {
    append('temp' as any)
    update(fields.length, '' as any)
  }, [append, update, fields.length])

  const handleRemoveColor = useCallback(
    (e, index: number) => {
      onRemove(index)
      handleSubmit(e)
    },
    [handleSubmit, onRemove]
  )

  useEffect(() => {
    append('' as any)
  }, [append])

  return (
    <Grid container>
      <Grid item flex={1}>
        <Grid container>
          <Grid item xs={10}>
            <Grid container alignItems="center" justifyContent="flex-start">
              <Grid item flex={1}>
                <Field
                  onBlur={handleSubmit}
                  control={control}
                  name={`colors.${index}.label`}
                  label="Nome da palheta de cores"
                />
              </Grid>
              <Tooltip placement="right" title="Remover cor">
                <IconButton onClick={e => handleRemoveColor(e, index)} color="error">
                  <Close />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-start" flexWrap="wrap">
              {fields?.map?.((field, colorIndex) => {
                return (
                  <Field
                    control={control}
                    onBlur={handleSubmit}
                    key={field.id}
                    sx={{ width: 120 }}
                    name={`colors.${index}.colors.${colorIndex}`}
                    label={`Cor ${colorIndex + 1} `}
                  />
                )
              })}
              <IconButton onClick={handleAddColor}>
                <Add />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
