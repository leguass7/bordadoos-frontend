import { useCallback, useEffect, useRef } from 'react'

import { Input as MuiInput, InputProps, Typography } from '@mui/material'
import { useField } from '@unform/core'

import { masks } from '~/helpers/masks'
import { addSeparatorsToNumberString, validNumber } from '~/helpers/string'

import { ErrorMessage } from './styles'

interface Props extends InputProps {
  label?: string
  number?: boolean
  int?: boolean
  mask?: keyof typeof masks
}

export const Input: React.FC<Props> = ({ name, type = 'text', id, label, number, onChange, int, mask, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null)
  const { defaultValue, fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      getValue(input) {
        const value = number ? validNumber(input.value) : input.value
        return value
      },
      setValue(input, value) {
        input.value = value
      },
      clearValue() {
        ref.current.value = ''
      }
    })
  }, [registerField, fieldName, number])

  const handleChange = useCallback(
    e => {
      let value: string = e.target.value

      if (value && mask) e.target.value = masks[mask](value)

      if (number) {
        value = addSeparatorsToNumberString(value, ['.', ','])

        if (int) value = value.replaceAll(/[,.]/g, '')
        ref.current.value = value.replace(/[^0-9.,]/g, '')
      }
      if (onChange) onChange(e)
    },
    [number, onChange, int, mask]
  )

  return (
    <div style={{ padding: 4 }}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <MuiInput
        fullWidth
        type={type}
        inputProps={{ id }}
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue}
        inputRef={ref}
        {...rest}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  )
}
