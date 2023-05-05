import React, { useCallback, useRef, useState } from 'react'

import { Search } from '@mui/icons-material'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { debounceEvent } from '~/helpers/debounce'

import { ErrorMessage } from '../styles'

export type SearchVarProps = {
  defaultValue?: string
  onChangeText?: (text: string) => void
  debounce?: number
  placeholder?: string
  hasError?: boolean
  messageError?: string
  disabled?: boolean
}

export const SearchInput: React.FC<SearchVarProps> = ({
  onChangeText,
  debounce = 300,
  placeholder = 'pesquisar',
  hasError,
  messageError,
  disabled
}) => {
  const inputRef = useRef<any>()
  const [, setHasText] = useState(false)

  const emitText = useCallback(
    (text: string) => {
      if (onChangeText) onChangeText(text)
      setHasText(!!text)
    },
    [onChangeText]
  )

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const newText = event?.target?.value ?? ''
      emitText(newText)
    },
    [emitText]
  )

  // const handleSearchClick = useCallback(() => {
  //   if (hasText && inputRef.current) {
  //     inputRef.current.value = ''
  //     emitText('')
  //   } else {
  //     emitText(inputRef?.current?.value ?? '')
  //   }
  // }, [inputRef, hasText, emitText])

  // const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(() => {}, [])

  return (
    <Container>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
        disabled={!!disabled}
        ref={inputRef}
        placeholder={placeholder}
        onChange={debounceEvent(handleChange, debounce)}
        // onKeyDown={handleKeyDown}
      />
      {hasError && messageError ? <ErrorMessage>{messageError}</ErrorMessage> : null}
    </Container>
  )
}
