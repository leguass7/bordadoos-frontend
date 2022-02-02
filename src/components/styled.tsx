import styled from 'styled-components'

import { TextAlign, TextProps } from '~/styles/commonProps'

export const Text = styled.p<TextProps>`
  padding: 0;
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  color: ${({ theme, themeColor = 'text', textColor }) => textColor || theme.colors[themeColor]};
  font-size: ${({ size = 'inherit' }) => size}px;
  line-height: ${({ height = 'inherit' }) => height}px;
`

export const Span = styled.span<TextProps>`
  padding: 0;
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  color: ${({ theme, themeColor = 'text', textColor }) => textColor || theme.colors[themeColor]};
  font-size: ${({ size = 'inherit' }) => size}px;
  line-height: ${({ height = 'inherit' }) => height}px;
`

export const SpacedContainer = styled.div<{ align?: TextAlign }>`
  position: relative;
  display: block;
  padding: ${({ theme }) => theme.spacing.l}px;
  min-height: 72px;
  text-align: ${({ align = 'left' }) => align};
`
