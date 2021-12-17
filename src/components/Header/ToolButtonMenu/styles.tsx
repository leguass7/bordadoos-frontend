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

export const UserContainer = styled.button`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 6px;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: none;
`
