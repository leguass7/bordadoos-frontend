import React from 'react'
import styled, { css } from 'styled-components'

import { VariantColorsTypes } from './AppThemeProvider/types'
import { useAppTheme } from './AppThemeProvider/useAppTheme'

export const Container = styled.div<{ color?: string; divider?: boolean }>`
  position: relative;
  display: block;
  max-width: 100%;
  padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.l}px`};
  color: ${({ color }) => color};
  p {
    max-width: 100%;
    display: block;
    padding: 0;
    margin: 0;
  }
  ${({ divider, theme }) =>
    divider
      ? css`
          border-bottom-width: 1px;
          border-bottom-color: ${theme.colors.border};
          border-bottom-style: solid;
        `
      : null}
`

type Props = {
  title: string
  themeColor?: VariantColorsTypes
  divider?: boolean
}
export const CardTitle: React.FC<Props> = ({ title, divider, themeColor = 'primary' }) => {
  const { theme } = useAppTheme()
  const color = theme.colors[themeColor]
  return (
    <Container color={color} divider={!!divider}>
      <p>{title}</p>
    </Container>
  )
}
