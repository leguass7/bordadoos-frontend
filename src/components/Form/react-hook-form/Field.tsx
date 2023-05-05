import { ChangeEventHandler, useCallback } from 'react'
import { Controller, Control, FieldError } from 'react-hook-form'

import TextField, { BaseTextFieldProps } from '@mui/material/TextField'
import styled from 'styled-components'

import { masks } from '~/helpers/masks'
import { addSeparatorsToNumberString } from '~/helpers/string'

import { ErrorMessage } from '../styles'

type Props = Partial<Omit<BaseTextFieldProps, 'error'>> & {
  control: Control<any>
  name: string
  label?: string
  error?: FieldError
  number?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  int?: boolean
  mask?: keyof typeof masks
}

export const Field: React.FC<Props> = ({
  name = '',
  control,
  id,
  defaultValue = '',
  label,
  onChange,
  number,
  int,
  onBlur,
  mask,
  error,
  ...props
}) => {
  const handleChange = useCallback(
    (e, cb) => {
      let value: string = e.target.value

      if (value && mask) e.target.value = masks[mask](value)

      if (number) {
        value = addSeparatorsToNumberString(value, ['.', ','])

        if (int) value = value.replaceAll(/[,.]/g, '')
        e.target.value = value.replace(/[^0-9.,]/g, '')
      }

      if (cb) cb(e)
      if (onChange) onChange(e)
    },
    [mask, number, int, onChange]
  )

  const handleBlur = useCallback(
    (e, cb) => {
      cb?.(e)
      onBlur?.(e)
    },
    [onBlur]
  )

  return (
    <Container>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        shouldUnregister
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            autoComplete="new-password"
            variant="outlined"
            {...props}
            id={id}
            label={label}
            fullWidth
            onBlur={e => handleBlur(e, onBlur)}
            onChange={e => handleChange(e, onChange)}
            value={value}
          />
        )}
      />
      {error?.message ? <ErrorMessage>{error?.message}</ErrorMessage> : null}
    </Container>
  )
}

const Container = styled.div`
  padding: 8px;
  /* width: 100%; */
`
