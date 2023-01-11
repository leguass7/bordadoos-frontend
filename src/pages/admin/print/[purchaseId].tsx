import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

import { Divider, Typography } from '@mui/material'
import { PriceRules } from '@prisma/client'
import styled from 'styled-components'

import { PurchasePrinter } from '~/components/Printer/PurchasePrinter'
import { purchaseConfigService } from '~/serverSide/purchases/purchase-configs/purchase-config.service'
import { PurchaseService } from '~/serverSide/purchases/purchase.service'
import { PurchaseWithItems } from '~/services/api/purchase'

import { serializedDto } from '../../../helpers/database'

interface Props {
  purchase?: PurchaseWithItems
  rules?: PriceRules[]
}

const Print: NextPage<Props> = ({ purchase, rules }) => {
  return (
    <Container>
      <HeaderContainer>
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <Typography variant="h4" flex={10} align="center">
          Pedido {purchase?.id}
        </Typography>
        <span style={{ flex: 1 }} />
      </HeaderContainer>

      <Divider sx={{ width: '100%' }} />

      <PurchasePrinter purchase={purchase} rules={rules} />
      <div style={{ flex: 1 }}></div>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const purchaseId = Number(params.purchaseId)

  if (!purchaseId) return { props: { purchase: {} } }
  const purchase = await PurchaseService.findById(purchaseId)

  purchase.category = serializedDto(purchase.category)
  purchase.type = serializedDto(purchase.type)
  purchase.client = serializedDto(purchase.client)

  const purchaseConfig = await purchaseConfigService.getPurchaseConfig({ purchaseId })
  const rules = serializedDto(purchaseConfig.priceRules)

  return {
    props: { purchase: serializedDto(purchase), rules: serializedDto(rules) }
  }
}

export default Print

const Container = styled.div`
  /* padding: 20px; */
  display: flex;
  height: 100%;
  flex-flow: column wrap;
  align-items: center;
  /* border: 1px dashed #000; */
  margin: auto;
  max-width: 219mm;
  width: 100%;
  background-color: #fff;
`

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  padding: 12px;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`
