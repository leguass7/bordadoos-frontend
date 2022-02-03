import styled from 'styled-components'

import { FlexAlign, FlexJustify, TextAlign, TextProps } from '~/styles/commonProps'

export const Text = styled.p<TextProps>`
  padding: 0;
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  color: ${({ theme, themeColor = 'text', textColor }) => textColor || theme.colors[themeColor]};
  font-size: ${({ size = 'inherit' }) => size}px;
  line-height: ${({ height = 'inherit' }) => height}px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`

export const Span = styled.span<TextProps>`
  padding: 0;
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  color: ${({ theme, themeColor = 'text', textColor }) => textColor || theme.colors[themeColor]};
  font-size: ${({ size = 'inherit' }) => size}px;
  line-height: ${({ height = 'inherit' }) => height}px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`

export const SpacedContainer = styled.div<{ align?: TextAlign }>`
  position: relative;
  display: block;
  padding: ${({ theme }) => theme.spacing.l}px;
  min-height: 72px;
  text-align: ${({ align = 'left' }) => align};
`

export const FlexContainer = styled.div<{ align?: FlexAlign; justify?: FlexJustify; spaced?: boolean }>`
  position: relative;
  max-width: 100%;
  display: flex;
  justify-content: ${({ justify = 'space-between' }) => justify};
  align-content: ${({ align = 'flex-start' }) => align};
  align-items: ${({ align = 'flex-start' }) => align};
  padding: ${({ theme, spaced }) => (spaced ? `${theme.spacing.l}px` : `0px`)};
`
