import { useCallback, useEffect, useRef, useState } from 'react'

import { SwitchProps, Switch as MuiSwitch, Typography, FormGroup, FormControlLabel } from '@mui/material'
import { useField } from '@unform/core'

interface Props extends SwitchProps {
  name: string
  label?: string
}

export const Switch: React.FC<Props> = ({ name, label, onChange, ...props }) => {
  const ref = useRef(null)
  const { defaultValue, fieldName, registerField } = useField(name)
  const [checked, setChecked] = useState(!!defaultValue)
  const [started, setStarted] = useState(false)
  const id = `id-${name}`

  // useEffect(() => {
  //   if (ref.current) {
  //     registerField({
  //       name: fieldName,
  //       ref: ref.current,
  //       path: 'checked',
  //       setValue(r, value: boolean) {
  //         if (ref.current) setChecked(value)
  //       },
  //       clearValue() {
  //         if (ref.current) setChecked(ref.current?.checked)
  //       }
  //     })
  //   }
  // }, [registerField, fieldName, checked])

  const handleSelection: any = (event: any) => setChecked(!!event.target.checked)

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'checked',
        setValue: (r, value: boolean) => {
          setChecked(value)
          if (r.current) r.current.checked = value
        },
        clearValue() {
          setChecked(false)
        }
      })
    }
  }, [fieldName, registerField, checked])

  useEffect(() => {
    if (!started && typeof defaultValue !== 'undefined') {
      setChecked(!!defaultValue)
      setStarted(true)
    }
  }, [started, defaultValue])

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiSwitch
            id={id}
            inputRef={ref}
            checked={!!checked}
            defaultChecked={defaultValue}
            onChange={handleSelection}
            {...props}
          />
        }
        htmlFor={id}
        label={label}
      />
    </FormGroup>
  )
}
