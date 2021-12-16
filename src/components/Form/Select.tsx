import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import MuiSelect, { SelectProps } from '@mui/material/Select'
import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'

interface Props extends SelectProps {
  items: MenuItemProps<'li', { label: string; value: string | number }>[]
  label: string
}

const Select: React.FC<Props> = ({ name, items, label, inputProps, ...props }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue(ref) {
        return ref?.current?.value
      }
    })
  }, [registerField, fieldName])

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id={label}>{label}</InputLabel>
      <MuiSelect
        labelId={label}
        name={name}
        defaultValue={defaultValue}
        inputRef={inputRef}
        label={label}
        {...props}
        inputProps={inputProps}
      >
        {items?.map(item => {
          return (
            <MenuItem key={`item-${item?.label}-${item?.value}`} {...item}>
              {item.label || null}
            </MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
