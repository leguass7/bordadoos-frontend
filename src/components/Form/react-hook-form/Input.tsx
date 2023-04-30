import { useCallback } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

import MuiInput, { InputProps } from '@mui/material/Input'
import styled from 'styled-components'

import { masks } from '~/helpers/masks'

import { ErrorMessage } from '../styles'

interface Props extends Omit<InputProps, 'error'> {
  control: Control<any>
  label?: string
  error?: FieldError
  mask?: keyof typeof masks
}

export const Input: React.FC<Props> = ({
  name = '',
  control,
  id,
  hidden,
  defaultValue = '',
  label,
  mask,
  error,
  ...props
}) => {
  const handleChange = useCallback(
    (e, cb) => {
      if (e?.target?.value && mask) e.target.value = masks[mask](e.target.value)

      if (cb) cb(e)
    },
    [mask]
  )

  return (
    <Container hidden={hidden}>
      {label && <label htmlFor={id}>{label}</label>}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        shouldUnregister
        render={({ field: { onChange, value, onBlur } }) => (
          <MuiInput
            fullWidth
            autoComplete="new-password"
            {...props}
            id={id}
            onBlur={onBlur}
            onChange={e => handleChange(e, onChange)}
            value={value}
          />
        )}
      />
      {error?.message ? <ErrorMessage>{error?.message}</ErrorMessage> : null}
    </Container>
  )
}

const Container = styled.div`
  padding: 8px;
  display: ${props => (props?.hidden ? 'none' : 'block')};
`
