import { Dispatch, SetStateAction, useState } from 'react'

import { Chip } from '@mui/material'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
  selected: number
  setSelected: Dispatch<SetStateAction<number>>
}

const chips = [
  {
    label: 'Pedidos',
    id: 1
  },
  {
    label: 'E-mail',
    id: 2,
    disabled: true
  }
]

export const SettingsChips: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <ChipContainer>
      {chips.map(({ label, id, disabled }) => {
        return (
          <Chip
            key={id}
            sx={{ mx: 1 }}
            color="primary"
            variant={selected === id ? 'filled' : 'outlined'}
            label={label}
            disabled={!!disabled}
            onClick={() => setSelected(id)}
          />
        )
      })}
    </ChipContainer>
  )
}
const ChipContainer = styled.nav`
  max-width: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`
