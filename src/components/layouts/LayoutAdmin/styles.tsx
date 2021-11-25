import styled, { css } from 'styled-components'

const baseCss = css`
  width: 100%;
  max-width: 100%;
  border: 0;
`

export const LayoutContainer = styled.div`
  ${baseCss}
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LayoutBar = styled.div`
  ${baseCss}
  min-height: 64px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: rgba(0, 0, 0, 0.8) 1px 1px 2px;
  z-index: 1000;
`

export const LayoutContent = styled.div<{ containerHeight: string }>`
  ${baseCss}
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  max-height: ${({ containerHeight }) => containerHeight};
  overflow-y: scroll;
`

export const LayoutFooter = styled.div`
  ${baseCss}
  min-height: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
`
