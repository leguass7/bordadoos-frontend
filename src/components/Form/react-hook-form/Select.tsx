import { ChangeEventHandler } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect, { SelectProps } from '@mui/material/Select'
import styled from 'styled-components'

import { ErrorMessage } from '../styles'

export interface IOptionProps {
  label?: string
  value?: string | number
  disabled?: boolean
}

interface Props extends Omit<SelectProps, 'error'> {
  control: Control<any>
  label?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  error?: FieldError
  options?: IOptionProps[]
}

export const Select: React.FC<Props> = ({
  name = '',
  control,
  id,
  defaultValue = '',
  label,
  error,
  onChange: customChange,
  options = [],
  ...props
}) => {
  return (
    <Container>
      <FormControl fullWidth>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <Controller
          name={name}
          defaultValue={defaultValue}
          control={control}
          shouldUnregister
          render={({ field: { onChange, value, ref } }) => {
            const handleChange = (e: any) => {
              onChange(e)
              if (customChange) customChange(e)
            }

            return (
              <MuiSelect
                {...props}
                autoComplete="off"
                id={id}
                fullWidth
                onChange={handleChange}
                value={value}
                inputRef={ref}
              >
                <MenuItem value={defaultValue as any}>Selecione</MenuItem>
                {options?.map(({ label, value, disabled }) => {
                  return (
                    <MenuItem value={value} disabled={disabled} key={`${label}-${value}`}>
                      {label}
                    </MenuItem>
                  )
                })}
              </MuiSelect>
            )
          }}
        />
      </FormControl>
      {error?.message ? <ErrorMessage>{error?.message}</ErrorMessage> : null}
    </Container>
  )
}

const Container = styled.div`
  padding: 8px;
`
