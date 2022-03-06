import styled, { css } from 'styled-components'

export const PanelWrapper = styled.div`
  position: relative;
  display: block;
  border: 0;
  padding: 4px 0;
`

export const ItemLine = styled.div<{ hideShadow?: boolean; color?: string }>`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 4px;
  padding: 4px;
  transition: 0.3s ease;
  margin: 4px 0;

  :hover {
    ${props =>
      props.hideShadow
        ? ''
        : css`
            box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
              0px 1px 3px 0px rgb(0 0 0 / 12%);
          `}
  }

  ${props =>
    props?.color &&
    css`
      background-color: ${props.color};
    `}
`

export const SwitchContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`
