import { useEffect, useRef, useState } from 'react'

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
      path: 'checked'
      // clearValue() {
      //   if (ref.current?.checked) ref.current.checked = false
      // }
    })
  }, [registerField, fieldName])

  return (
    <div>
      {label ? (
        <Typography component="label" variant="caption" color="grayText">
          {label}
        </Typography>
      ) : null}
      <MuiSwitch inputRef={ref} defaultChecked={!!defaultValue} {...props} />
    </div>
  )
}
