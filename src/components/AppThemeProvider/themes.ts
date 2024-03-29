import { alpha, createTheme } from '@mui/material'

import { IThemeSpacing, IAppTheme } from './types'

const rounded = 5
const spacing: IThemeSpacing = {
  xs: 2,
  s: 4,
  m: 6,
  l: 10,
  xl: 14
}

export const appThemeDark: IAppTheme = {
  colors: {
    primary: '#292B2B',
    secondary: '#FCB91C',
    contrast: '#FBE5CA',
    text: '#808080',
    white: '#FFFFFF',
    black: '#000000',
    border: '#ccc',
    shadow: '#C3C3C3',
    textDark: '#808080',
    background: '#EDEDED',
    success: '#2E7D32',
    errors: '#D32F2F',
    warning: '#ED6C02',
    info: '#0288D1'
  },
  spacing,
  rounded,
  borderWidth: 1
}

export const appThemeLigth: IAppTheme = {
  colors: {
    primary: '#292B2B',
    secondary: '#FCB91C',
    contrast: '#FBE5CA',
    text: '#808080',
    white: '#FFFFFF',
    black: '#000000',
    border: '#ccc',
    shadow: '#C3C3C3',
    textDark: '#808080',
    background: '#EDEDED',
    success: '#2E7D32',
    errors: '#D32F2F',
    warning: '#ED6C02',
    info: '#0288D1'
  },
  spacing,
  rounded,
  borderWidth: 1
}

export const appMuiTheme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          '&::before, &::after': {
            borderColor: alpha('#000000', 1)
          }
        }
      }
    }
  },
  palette: {
    primary: {
      main: appThemeLigth.colors.primary
    },
    secondary: {
      main: appThemeLigth.colors.secondary
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
})
