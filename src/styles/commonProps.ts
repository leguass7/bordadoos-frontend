import { VariantColorsTypes } from '~/components/AppThemeProvider/types'

export type FlexJustify = 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'center' | 'space-evenly'
export type FlexAlign = 'center' | 'stretch' | 'baseline' | 'flex-start' | 'flex-end'
export type TextAlign = 'center' | 'left' | 'right' | 'justify'

export type MarginProps = {
  topMargin?: number
  bottomMargin?: number
  leftMargin?: number
  rightMargin?: number
  verticalSpaced?: boolean
  horizontalSpaced?: boolean
}

export type TextProps = {
  align?: TextAlign
  themeColor?: VariantColorsTypes
  textColor?: string
  size?: number
  height?: number
}
