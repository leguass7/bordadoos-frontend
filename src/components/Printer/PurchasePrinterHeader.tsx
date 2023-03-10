import Image from 'next/image'

import { Typography } from '@mui/material'
import styled from 'styled-components'

import type { PurchaseWithItems } from '~/services/api/purchase'

interface Props {
  purchase: PurchaseWithItems
}

export const PurchasePrinterHeader: React.FC<Props> = ({ purchase }) => {
  return (
    <HeaderContainer>
      <Image priority src="/logo.webp" width={64} height={64} alt="logo" />
      <Typography variant="h4" lineHeight="0.8em">
        Pedido {purchase?.name || purchase?.id}
        <br />
      </Typography>
      <span />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  padding: 12px;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`
