import { createTheme } from '@mui/material'

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
    primary: '#b07b80',
    secondary: '#F7ABAF',
    contrast: '#FBE5CA',
    text: '#ffffff',
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
    primary: '#b07b80',
    secondary: '#F7ABAF',
    contrast: '#FBE5CA',
    text: '#ffffff',
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
  palette: {
    primary: {
      main: '#b07b80'
    },
    secondary: {
      main: '#F7ABAF'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
})
