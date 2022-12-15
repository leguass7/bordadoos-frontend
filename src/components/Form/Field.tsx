import { useCallback, useEffect, useRef, useState } from 'react'

import TextField, { StandardTextFieldProps, TextFieldProps } from '@mui/material/TextField'
import { useField } from '@unform/core'

import { masks } from '~/helpers/masks'
import { addSeparatorsToNumberString, validNumber } from '~/helpers/string'

import { ErrorMessage } from './styles'

interface Props extends StandardTextFieldProps {
  label?: string
  number?: boolean
  int?: boolean
  mask?: keyof typeof masks
}

export const Field: React.FC<Props> = ({ name, type = 'text', id, label, number, onChange, int, mask, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [shrink, setShrink] = useState(false)
  const { defaultValue, fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      getValue(input) {
        const value = number ? validNumber(input.value) || 0 : input?.value || ''
        return value
      },
      setValue(input, value = '') {
        setShrink(!!value || value === 0)
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

      setShrink(!!value)

      if (onChange) onChange(e)
    },
    [number, onChange, int, mask]
  )

  const handleFocus = useCallback(() => {
    setShrink(true)
  }, [])

  const handleBlur = useCallback(() => {
    setShrink(!!ref.current?.value)
  }, [])

  return (
    <div style={{ padding: 4 }}>
      <TextField
        fullWidth
        type={type}
        inputProps={{ id }}
        name={name}
        label={label}
        onChange={handleChange}
        defaultValue={defaultValue}
        InputLabelProps={{ shrink }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputRef={ref}
        {...rest}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  )
}
