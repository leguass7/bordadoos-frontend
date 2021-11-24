import React from 'react'

import ThemeProvider from './Provider'
import { StyledProvider } from './StyledProvider'
import { ThemeProviderProps } from './types'

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <StyledProvider>{children}</StyledProvider>
    </ThemeProvider>
  )
}
