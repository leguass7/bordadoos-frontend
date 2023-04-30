import { ChangeEventHandler, useCallback } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

import { DatePicker as MuiDatepicker, DatePickerProps } from '@mui/lab'
import { TextField } from '@mui/material'
import styled from 'styled-components'

import { ErrorMessage } from '../styles'

interface Props extends Omit<Partial<DatePickerProps<Date>>, 'onChange'> {
  control: Control<any>
  defaultValue?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  name: string
  error?: FieldError
}

export const Datepicker: React.FC<Props> = ({ control, defaultValue = null, name, error, onChange, ...props }) => {
  const handleChange = useCallback(
    (e, cb) => {
      cb?.(e)
      onChange?.(e)
    },
    [onChange]
  )

  return (
    <Container>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        shouldUnregister
        render={({ field: { ref, onChange, ...field } }) => {
          return (
            <MuiDatepicker
              inputRef={ref}
              renderInput={inputProps => <TextField fullWidth {...inputProps} />}
              {...props}
              {...field}
              onChange={e => handleChange(e, onChange)}
            />
          )
        }}
      />
      {error?.message ? <ErrorMessage>{error?.message}</ErrorMessage> : null}
    </Container>
  )
}

const Container = styled.div`
  padding: 8px;
  width: 100%;
`
