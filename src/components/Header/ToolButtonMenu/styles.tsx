import styled from 'styled-components'

export const ButtonContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.border};
  min-height: 100vh;
  width: 100%;
  min-width: 250px;
  max-width: 320px;
  color: inherit;
  overflow-x: hidden;
`
