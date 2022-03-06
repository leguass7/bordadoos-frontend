import { useCallback, useEffect, useRef, useState } from 'react'

import { SwitchProps, Switch as MuiSwitch, Typography } from '@mui/material'
import { useField } from '@unform/core'

interface Props extends SwitchProps {
  name: string
  label?: string
}

export const Switch: React.FC<Props> = ({ name, label, ...props }) => {
  const ref = useRef(null)
  const { defaultValue, fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      getValue() {
        return !!ref.current?.firstElementChild?.checked
      }
    })
  }, [registerField, fieldName])

  return (
    <div>
      {label ? (
        <Typography component="label" variant="caption" color="grayText">
          {label}
        </Typography>
      ) : null}
      <MuiSwitch ref={ref} defaultChecked={!!defaultValue} {...props} />
    </div>
  )
}
