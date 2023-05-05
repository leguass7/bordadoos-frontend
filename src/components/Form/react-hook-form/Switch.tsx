import { useCallback } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

import FormControlLabel from '@mui/material/FormControlLabel'
import MuiSwitch, { SwitchProps } from '@mui/material/Switch'
import styled from 'styled-components'

import { ErrorMessage } from '../styles'

interface Props extends SwitchProps {
  label?: string
  error?: FieldError
  control: Control<any>
  name: string
}

export const Switch: React.FC<Props> = ({
  label,
  defaultValue = false,
  error,
  control,
  onChange,
  name = '',
  ...props
}) => {
  const handleChange = useCallback(
    (e, v, cb) => {
      if (cb) cb(e, v)
      if (onChange) onChange(e, v)
    },
    [onChange]
  )

  return (
    <Container>
      <FormControlLabel
        label={label}
        control={
          <Controller
            name={name}
            shouldUnregister
            defaultValue={defaultValue}
            control={control}
            render={({ field: { ref, value, onChange, ...field } }) => (
              <MuiSwitch
                {...props}
                {...field}
                onChange={(e, c) => handleChange(e, c, onChange)}
                inputRef={ref}
                checked={!!value}
              />
            )}
          />
        }
      />
      {error?.message ? <ErrorMessage>{error?.message}</ErrorMessage> : null}
      {/* {label && <label htmlFor={id}>{label}</label>}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        shouldUnregister
        render={({ field: { value, onChange, ref, ...params } }) => (
          <MuiSwitch
            id={id}
            inputRef={ref}
            onChange={(_, data) => onChange(data)}
            checked={value}
            {...params}
          />
        )}
      />
        {error?.message ? <ErrorMessage>{error?.message}</ErrorMessage> : null} */}
    </Container>
  )
}

const Container = styled.div`
  padding: 8px;
`
