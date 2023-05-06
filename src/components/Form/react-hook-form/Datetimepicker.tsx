import { Control, Controller, FieldError } from 'react-hook-form'

import { DateTimePickerProps, DateTimePicker as MuiDatetimepicker } from '@mui/lab'
import { TextField } from '@mui/material'
import styled from 'styled-components'

import { ErrorMessage } from '../styles'

interface Props extends Partial<DateTimePickerProps<Date>> {
  control: Control<any>
  defaultValue?: string
  name: string
  error?: FieldError
}

export const Datetimepicker: React.FC<Props> = ({ control, defaultValue = null, name, error, ...props }) => {
  return (
    <Container>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        shouldUnregister
        render={({ field: { ref, ...field } }) => {
          return (
            <MuiDatetimepicker
              renderInput={inputProps => <TextField fullWidth {...inputProps} />}
              inputRef={ref}
              {...props}
              {...field}
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
