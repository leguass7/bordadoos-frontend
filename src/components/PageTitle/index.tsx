import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useMemo } from 'react'

import { VariantColorsTypes } from '../AppThemeProvider/types'
import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { BackContainer, Description, PageTitleContainer, Title, Tools } from './styles'

export type PageTitleProps = {
  title?: string
  spotlight?: string
  themeColor?: VariantColorsTypes
  withBack?: boolean
  description?: string
}

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  title,
  spotlight,
  themeColor = 'primary',
  withBack,
  description
}) => {
  const { theme, matchingBackgroudText } = useAppTheme()
  const { back } = useRouter()

  const textColor = useMemo(() => matchingBackgroudText(themeColor), [matchingBackgroudText, themeColor])
  const handleBack = useCallback(() => back(), [back])

  return (
    <>
      <PageTitleContainer>
        {withBack ? (
          <BackContainer bgColor={theme.colors[themeColor]} textColor={textColor}>
            <button type="button" onClick={handleBack}>
              <ArrowBack fontSize="medium" />
            </button>
          </BackContainer>
        ) : null}
        <Title color={theme.colors[themeColor]}>
          <h2>
            {spotlight ? <span>{spotlight} </span> : null}
            {title}
          </h2>
          {description ? <Description>{description}</Description> : null}
        </Title>
        <Tools>{children}</Tools>
      </PageTitleContainer>
    </>
  )
}
