import { darken } from '@mui/system'
import styled from 'styled-components'

export const BackContainer = styled.div<{ bgColor: string; textColor?: string }>`
  margin-right: ${({ theme }) => theme.spacing.m}px;
  border: 0;
  button {
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    padding: 0;
    margin: 0;
    color: ${({ textColor = 'currentColor' }) => textColor};
    width: 22px;
    height: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    &:hover {
      background-color: ${({ bgColor }) => darken(bgColor, 0.5)};
    }
  }
`

export const PageTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 100%;
  /* border: 1px dashed #000; */
  padding: 0;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacing.l}px;
  padding-top: ${({ theme }) => theme.spacing.l}px;
`

export const Title = styled.div<{ color: string }>`
  flex: 1;
  h2 {
    color: ${({ theme }) => theme.colors.textDark};
    font-weight: normal;
    font-size: 18px;
  }

  span {
    color: ${({ color }) => color};
  }
`
export const Tools = styled.div``

export const Description = styled.p`
  display: block;
  padding: 0;
  margin: 0 auto;
  max-width: 100%;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDark};
`
