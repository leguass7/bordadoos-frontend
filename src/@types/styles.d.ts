import 'styled-components'
import { IAppTheme } from '~/components/AppThemeProvider/types'

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}

declare module '@mui/material/styles' {
  export interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    teste?: string
  }
}
