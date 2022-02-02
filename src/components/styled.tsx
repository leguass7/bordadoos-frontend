import styled from 'styled-components'

import { TextAlign } from '~/styles/commonProps'

import { VariantColorsTypes } from './AppThemeProvider/types'

export const Text = styled.p<{ align?: TextAlign; color?: VariantColorsTypes; size?: number; height?: number }>`
  padding: 0;
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  color: ${({ theme, color = 'text' }) => theme.colors[color]};
  font-size: ${({ size = 'inherit' }) => size}px;
  line-height: ${({ height = 'inherit' }) => height}px;
`

export const Span = styled.span<{ align?: TextAlign; color?: VariantColorsTypes; size?: number; height?: number }>`
  padding: 0;
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  color: ${({ theme, color = 'text' }) => theme.colors[color]};
  font-size: ${({ size = 'inherit' }) => size}px;
  line-height: ${({ height = 'inherit' }) => height}px;
`

export const SpacedContainer = styled.div`
  position: relative;
  display: block;
  padding: ${({ theme }) => theme.spacing.l}px;
  min-height: 72px;
`
