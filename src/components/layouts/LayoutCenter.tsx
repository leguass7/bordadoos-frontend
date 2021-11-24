import { Box } from '@mui/system'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-flow: column nowrap;
  border: 0;
  height: 100%;
`

export const LayoutCenter: React.FC = ({ children }) => {
  return (
    <Container>
      <Box>{children}</Box>
    </Container>
  )
}
