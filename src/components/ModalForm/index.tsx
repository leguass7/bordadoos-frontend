import React from 'react'
import styled from 'styled-components'

// import type { FlexJustify, MarginProps } from '~/styles/commonProps'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { VariantColorsTypes } from '../shared/core/src'

type Props = {
  title?: string
  themeColor?: VariantColorsTypes
  widthLimit?: number
}
export const ModalForm: React.FC<Props> = ({ children, title, themeColor = 'primary', widthLimit }) => {
  const { theme, matchingBackgroudText } = useAppTheme()
  const textColor = matchingBackgroudText(themeColor)

  return (
    <Wrapper widthLimit={widthLimit}>
      <ModalFormContainer>
        {title ? (
          <ModalTitle bgColor={theme.colors[themeColor]} textColor={textColor}>
            <p>{title}</p>
          </ModalTitle>
        ) : null}
        <ModalContent>{children}</ModalContent>
      </ModalFormContainer>
    </Wrapper>
  )
}

export const ModalTitle = styled.div<{ textColor?: string; bgColor?: string }>`
  background-color: ${({ bgColor = 'transparent' }) => bgColor};
  color: ${({ textColor = 'inherit' }) => textColor};
  /* margin-bottom: ${({ theme }) => theme.spacing.l}px; */
  p {
    padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.l}px`};
  }
`

export const ModalFormContainer = styled.div`
  max-width: 100%;
  width: 100%;
  border-radius: ${({ theme }) => theme.rounded}px;
  padding: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`

export const ModalContent = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0;
  padding-top: ${({ theme }) => theme.spacing.l}px;
`

const Wrapper = styled.div<{ widthLimit?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 100%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  width: ${({ widthLimit = 500 }) => widthLimit}px;
  @media (max-width: 600px) {
    padding-left: ${({ theme }) => theme.spacing.l}px;
    padding-right: ${({ theme }) => theme.spacing.l}px;
  }
`
// export const FormBlock = styled.div<{ flex?: boolean; justify?: FlexJustify; isWrap?: boolean } & MarginProps>`
//   padding: 0 0 10px 0;
//   display: block;
//   justify-content: ${({ justify = 'space-between' }) => justify};
//   flex-wrap: ${({ isWrap }) => (isWrap ? 'warp' : 'nowrap')};
//   align-content: center;
//   align-items: center;
//   max-width: 100%;
//   width: 100%;
//   margin: 0 auto;

//   padding-left: ${({ theme, leftMargin = 0, horizontalSpaced }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
//   padding-right: ${({ theme, rightMargin = 0, horizontalSpaced }) =>
//     horizontalSpaced ? theme.spacing.l : rightMargin}px;
//   margin-top: ${({ theme, topMargin = 0, verticalSpaced }) => (verticalSpaced ? theme.spacing.l : topMargin)}px;
//   margin-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) =>
//     verticalSpaced ? theme.spacing.l : bottomMargin}px;
//   ${({ flex, isWrap }) =>
//     flex
//       ? css`
//           display: flex;
//           @media (max-width: 502px) {
//             display: ${isWrap ? 'block' : 'flex'};
//             & > div:last-child {
//               margin-top: ${isWrap ? 10 : 0}px;
//             }
//           }
//         `
//       : css``}
// `
