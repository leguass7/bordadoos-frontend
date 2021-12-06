import { VariantColorsTypes } from './Theme/types'

export type FlexJustify = 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'center' | 'space-evenly'
export type FlexAlign = 'center' | 'stretch' | 'baseline' | 'flex-start' | 'flex-end'

export type MarginProps = {
  topMargin?: number
  bottomMargin?: number
  leftMargin?: number
  rightMargin?: number
  verticalSpaced?: boolean
  horizontalSpaced?: boolean
}

export type SimpleTextProps = MarginProps & {
  bold?: boolean
  themeColor?: VariantColorsTypes
  size?: number
  color?: string
  align?: 'center' | 'left' | 'right' | 'justify'
}

export type FlexOneProps = MarginProps & {
  align?: FlexAlign
  justify?: FlexJustify
  grow?: number
  horizontalPad?: number
  width?: string
  backgroundTheme?: VariantColorsTypes
}
