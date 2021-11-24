import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '~/styles/global'

import { appMuiTheme } from './themes'
import { useAppTheme } from './useAppTheme'

export const StyledProvider: React.FC = ({ children }) => {
  const { theme } = useAppTheme()
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={appMuiTheme}>
        <GlobalStyle />
        {children}
      </MuiThemeProvider>
    </ThemeProvider>
  )
}
