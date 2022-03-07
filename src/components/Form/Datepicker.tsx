import { useCallback, useEffect, useRef, useState } from 'react'

import { DatePicker, DatePickerProps } from '@mui/lab'
import { TextField } from '@mui/material'
import { useField } from '@unform/core'

import { formatDate, validDate } from '~/helpers/string'

import { ErrorMessage } from './styles'

interface Props extends Partial<DatePickerProps> {
  name: string
}

export const Datepicker: React.FC<Props> = ({ name, onChange, ...props }) => {
  const ref = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  const [value, setValue] = useState<string | Date>(validDate(defaultValue))

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      getValue() {
        if (ref.current) {
          return ref.current.value
        }
      },
      clearValue() {
        if (ref.current) {
          ref.current.value = ''
          setValue(null)
        }
      }
    })
  }, [registerField, fieldName])

  const handleChange = useCallback(
    (date: string | Date, keyboardInputValue?: string) => {
      setValue(date)
      if (onChange) onChange(date, keyboardInputValue)
    },
    [onChange]
  )

  return (
    <div style={{ padding: 4 }}>
      <DatePicker
        {...props}
        inputRef={ref}
        label="Data de entrega"
        clearable
        value={value}
        clearText="limpar"
        onChange={handleChange}
        renderInput={params => <TextField {...params} />}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  )
}
