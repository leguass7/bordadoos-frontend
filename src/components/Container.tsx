import React from 'react'

import styled from 'styled-components'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'

const Wrapper = styled.div<{ padding: string }>`
  max-width: 100%;
  margin: 0 auto;
  width: 900px;
  display: block;
  overflow-x: hidden;
  border: 0;
  padding: ${({ padding }) => padding};
`

type ContainerProps = {
  horizontalSpaced?: boolean
  verticalSpaced?: boolean
}

export const Container: React.FC<ContainerProps> = ({ children, horizontalSpaced, verticalSpaced }) => {
  const { theme } = useAppTheme()
  const hs = `${horizontalSpaced ? theme.spacing.l : 0}px`
  const vs = `${verticalSpaced ? theme.spacing.l : 0}px`
  const padding = [vs, hs, vs, hs].join(' ')

  return <Wrapper padding={padding}>{children}</Wrapper>
}
