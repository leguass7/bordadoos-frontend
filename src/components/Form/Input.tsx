import { useEffect, useRef } from 'react'

import { Input as MuiInput, InputProps, Typography } from '@mui/material'
import { useField } from '@unform/core'

interface Props extends InputProps {
  label?: string
}

export const Input: React.FC<Props> = ({ name, type = 'text', id, label, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null)
  const { defaultValue, fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref,
      getValue(ref) {
        return ref?.current?.value
      }
    })
  }, [registerField, fieldName])

  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <MuiInput type={type} inputProps={{ id }} name={name} defaultValue={defaultValue} inputRef={ref} {...rest} />
    </>
  )
}
