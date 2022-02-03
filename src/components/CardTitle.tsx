import React from 'react'

import styled, { css } from 'styled-components'

import { VariantColorsTypes } from './AppThemeProvider/types'
import { useAppTheme } from './AppThemeProvider/useAppTheme'

export const Container = styled.div<{ color?: string; divider?: boolean; isFlex?: boolean }>`
  position: relative;
  display: ${({ isFlex }) => (isFlex ? 'flex' : 'block')};
  justify-content: space-between;
  flex-flow: nowrap row;
  align-items: center;
  align-content: center;
  max-width: 100%;
  padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.l}px`};
  color: ${({ color }) => color};
  p {
    max-width: 100%;
    display: block;
    padding: 0;
    margin: 0;
    flex: 1;
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
export const Tools = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;
`

type Props = {
  title: string
  themeColor?: VariantColorsTypes
  divider?: boolean
}
export const CardTitle: React.FC<Props> = ({ title, divider, themeColor = 'primary', children }) => {
  const { theme } = useAppTheme()
  const color = theme.colors[themeColor]
  return (
    <Container color={color} divider={!!divider} isFlex={!!children}>
      <p>{title}</p>
      {children ? <Tools>{children}</Tools> : null}
    </Container>
  )
}
