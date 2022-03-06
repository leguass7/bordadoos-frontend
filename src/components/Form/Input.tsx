import { useCallback, useEffect, useRef } from 'react'

import { Input as MuiInput, InputProps, Typography } from '@mui/material'
import { useField } from '@unform/core'

import { ErrorMessage } from './styles'

interface Props extends InputProps {
  label?: string
  number?: boolean
}

export const Input: React.FC<Props> = ({ name, type = 'text', id, label, number, onChange, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null)
  const { defaultValue, fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value'
    })
  }, [registerField, fieldName])

  const handleChange = useCallback(
    e => {
      const value = e.target.value
      if (number) {
        ref.current.value = value.replace(/\D/g, '')
      }
      if (onChange) onChange(e)
    },
    [number, onChange]
  )

  return (
    <div style={{ padding: 4 }}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <MuiInput
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
