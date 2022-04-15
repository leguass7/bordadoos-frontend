import styled, { css } from 'styled-components'

interface GridStructure {
  justify?: string
  align?: string
  expand?: number
}

// FIXME: duplicated code
export const Row = styled.div<GridStructure>`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${props => props?.justify ?? 'flex-start'};
  align-items: ${props => props?.align ?? 'flex-start'};

  ${props =>
    props?.expand &&
    css`
      flex: ${props?.expand ?? 'auto'};
    `}
`

export const Column = styled.div<GridStructure>`
  display: flex;
  flex-flow: column wrap;
  justify-content: ${props => props?.justify ?? 'center'};
  align-items: ${props => props?.align ?? 'center'};
  padding: 2px;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }

  ${props =>
    props?.expand &&
    css`
      flex: ${props?.expand ?? 'auto'};
    `}
`
