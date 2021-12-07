import styled, { css } from 'styled-components'

import { SimpleTextProps } from '../../core/src'
import { FlexOneProps } from '../../core/src/styledTypes'

export const SimpleText = styled.span<SimpleTextProps>`
  font-family: 'Roboto Lt';
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ themeColor = 'text', theme, color }) => color || theme.colors[themeColor]};
  font-size: ${({ size = 16 }) => size}px;
  margin-left: ${({ theme, leftMargin = 0, horizontalSpaced }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
  margin-right: ${({ theme, rightMargin = 0, horizontalSpaced }) =>
    horizontalSpaced ? theme.spacing.l : rightMargin}px;
  margin-top: ${({ theme, topMargin = 0, verticalSpaced }) => (verticalSpaced ? theme.spacing.l : topMargin)}px;
  margin-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) =>
    verticalSpaced ? theme.spacing.l : bottomMargin}px;
  text-align: ${({ align = 'left' }) => align};
`

export const Paragraph = styled.p<SimpleTextProps>`
  display: block;
  max-width: 100%;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  font-family: 'Roboto Lt';
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ themeColor = 'text', theme, color }) => color || theme.colors[themeColor]};
  font-size: ${({ size = 16 }) => size}px;
  margin-left: ${({ theme, leftMargin = 0, horizontalSpaced }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
  margin-right: ${({ theme, rightMargin = 0, horizontalSpaced }) =>
    horizontalSpaced ? theme.spacing.l : rightMargin}px;
  margin-top: ${({ theme, topMargin = 0, verticalSpaced }) => (verticalSpaced ? theme.spacing.l : topMargin)}px;
  margin-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) =>
    verticalSpaced ? theme.spacing.l : bottomMargin}px;
  text-align: ${({ align = 'left' }) => align};
`

type WebFlexProps = FlexOneProps & {
  colorText?: string
}

export const FlexOne = styled.div<WebFlexProps>`
  width: ${({ width = 'auto' }) => width};
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'flex-start' }) => align};
  align-content: ${({ align = 'flex-start' }) => align};
  margin-top: ${({ theme, topMargin = 0, verticalSpaced }) =>
    verticalSpaced && !topMargin ? theme.spacing.l : topMargin}px;
  margin-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) =>
    verticalSpaced ? theme.spacing.l : bottomMargin}px;
  margin-left: ${({ theme, leftMargin = 0, horizontalSpaced }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
  margin-right: ${({ theme, rightMargin = 0, horizontalSpaced }) =>
    horizontalSpaced ? theme.spacing.l : rightMargin}px;
  padding-right: ${({ horizontalPad }) => horizontalPad || 0}px;
  padding-left: ${({ horizontalPad }) => horizontalPad || 0}px;
  background-color: ${({ backgroundTheme, theme }) =>
    backgroundTheme ? theme.colors[backgroundTheme] : 'transparent'};
  color: ${({ colorText }) => colorText || 'inherit'};

  ${({ grow }) =>
    grow
      ? css`
          flex: ${grow};
        `
      : null};
`
