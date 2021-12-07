import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { VariantColorsTypes, FlexJustify } from '../shared/core/src'
type FontType = {
  textColor?: string
  size?: number
}

export type FlatItemProps = {
  themeColor?: VariantColorsTypes
  justify?: FlexJustify
  animeTime?: number
}

export const FlatItem: React.FC<FlatItemProps> = ({ children, themeColor = 'white', justify, animeTime }) => {
  // const { theme, matchingBackgroudText } = useAppTheme()
  // const color = matchingBackgroudText(themeColor)
  const color = '#222'
  return (
    <FlatItemContainer
      bgColor={'#f1f1f1' /*colors[themeColor]*/}
      textColor={color}
      justify={justify}
      animeTime={animeTime}
    >
      {children}
    </FlatItemContainer>
  )
}

const anime = keyframes`
  from{
    transform: translate(-100px);
    opacity: 0;
  }
  to{
    transform: translate(0);
    opacity: 1;
  }
`

const flexCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const flexGrow = (num: number) => {
  return num
    ? css`
        flex: ${num};
      `
    : css``
}

export const FlatDescriptionContainer = styled.div<FontType & { grow?: number }>`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  border: 0;
  margin-right: ${({ theme }) => theme.spacing.m}px;
  color: ${({ textColor = 'inherit' }) => textColor};
  font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
  ${({ grow }) => flexGrow(grow)}
`

export const FlatIconContainer = styled.div<FontType>`
  padding: 0;
  margin-right: ${({ theme }) => theme.spacing.m}px;
  width: ${({ size = 72 }) => size}px;
  height: ${({ size = 72 }) => size}px;
  color: ${({ textColor = 'inherit' }) => textColor};
  border: 0;
  ${flexCenter}
`

export const FlatTitle = styled.span<FontType>`
  display: block;
  width: 100%;
  max-width: 100%;
  font-size: ${({ size = 16 }) => size}px;
  line-height: ${({ size = 18 }) => size}px;
  padding: 0;
  margin: 0;
  color: ${({ textColor = 'inherit' }) => textColor};
  sup {
    font-size: 10px;
  }
  sup.left {
    margin-left: ${({ theme }) => theme.spacing.s}px;
  }
  sup.right {
    margin-right: ${({ theme }) => theme.spacing.s}px;
  }
`

export const FlatDescriptionLine = styled.div<FontType>`
  display: block;
  max-width: 100%;
  max-height: 20px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  word-break: break-all;
  color: ${({ textColor = 'inherit' }) => textColor};
  font-size: ${({ size = 14 }) => size}px;
`
export const FlatText = styled.span<FontType>`
  display: inline-block;
  padding: 0;
  margin: 0;
  word-break: break-all;
  color: ${({ textColor = 'inherit' }) => textColor};
  font-size: ${({ size = 10 }) => size}px;
`

export const FlatItemContainer = styled.div<{ bgColor: string; justify?: FlexJustify; animeTime?: number } & FontType>`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify = 'space-between' }) => justify};
  align-items: center;
  max-width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  border-radius: ${({ theme }) => theme.rounded}px;
  margin-bottom: ${({ theme }) => theme.spacing.l}px;
  box-shadow: ${({ theme }) => theme.colors.shadow} 3px 3px 0;
  overflow: hidden;
  font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
  animation: ${anime} ${({ animeTime = 0 }) => animeTime}ms backwards;
`
