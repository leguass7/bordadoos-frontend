import type { SetStateAction, Dispatch } from 'react'

export interface IThemeSpacing {
  xs: number
  s: number
  m: number
  l: number
  xl: number
}

export interface ThemeColors {
  primary: string
  secondary: string
  contrast: string
  text: string
  border: string
  white: string
  black: string
  shadow: string
  textDark: string
  background: string
  success: string
  errors: string
  warning: string
  info: string
}
export interface IAppTheme {
  colors: ThemeColors
  spacing: IThemeSpacing
  rounded: number
  borderWidth: number
}

export interface IThemeContext {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
  theme: IAppTheme
  // setTheme: Dispatch<SetStateAction<IAppTheme>>
  matchRules: MatchingRules
}

export type VariantColorsTypes = keyof ThemeColors

export type TextColor = string
// @ts-ignore
export type MatchingRules = [...VariantColorsTypes[], TextColor][]

export interface IUseAppTheme extends Omit<IThemeContext, 'matchRules'> {
  matchingBackgroudText: (_themeKeyColor?: VariantColorsTypes, _defColor?: string) => string
}

export type ThemeProviderProps = {
  theme?: IAppTheme
}
