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
  const [value, setValue] = useState<Date | string>(validDate(defaultValue))

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      getValue() {
        return formatDate(value, 'dd/MM/yyyy')
      }
    })
  }, [registerField, fieldName, value])

  const handleChange = useCallback(
    (date: string | Date, keyboardInputValue?: string) => {
      setValue(date)
      if (onChange) onChange(date, keyboardInputValue)
    },
    [onChange]
  )

  return (
    <>
      <DatePicker
        {...props}
        ref={ref}
        label="Data de entrega"
        value={value}
        onChange={handleChange}
        renderInput={params => <TextField {...params} />}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </>
  )
}
