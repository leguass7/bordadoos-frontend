import styled, { keyframes } from 'styled-components'

export const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

export const LoadContainer = styled.div<{
  bgColor: string
  stroke: number
  bColor: string
  speed: number
  size: number
  relative?: boolean
}>`
  position: ${({ relative }) => (relative ? 'relative' : 'absolute')};
  margin: 0 auto;
  top: 0;
  left: 0;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  /* max-width: 100%; */
  height: 100%;
  min-height: 100%;
  p {
    font-size: 14px;
    color: ${({ bColor }) => bColor};
    text-align: center;
    padding: 5px;
  }
  div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    div {
      display: block;
      border-radius: 50%;
      border: ${({ stroke }) => stroke}px solid #f1f1f1;
      border-top-color: ${({ bColor }) => bColor};
      animation: ${rotate} 200ms linear infinite;
      animation-duration: ${({ speed }) => `${speed}ms`};
      width: ${({ size }) => `${size}px`};
      height: ${({ size }) => `${size}px`};
    }
  }
`
