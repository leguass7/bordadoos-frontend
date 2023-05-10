import { GetServerSideProps, NextPage } from 'next'

import { PriceRules } from '@prisma/client'
import styled from 'styled-components'

import { PurchaseClientPrinter } from '~/components/Printer/PurchaseClientPrinter'
import { PurchaseOperatorPrinter } from '~/components/Printer/PurchaseOperatorPrinter'
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
      <PurchaseClientPrinter purchase={purchase} rules={rules} />
      <PurchaseOperatorPrinter purchase={purchase} rules={rules} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const purchaseId = Number(params.purchaseId)

  if (!purchaseId) return { props: { purchase: {} } }
  const purchase = await PurchaseService.findById(purchaseId)

  if (purchase?.category) purchase.category = serializedDto(purchase.category)
  if (purchase?.type) purchase.type = serializedDto(purchase.type)
  if (purchase?.client) purchase.client = serializedDto(purchase.client)
  if (purchase?.createdUser) purchase.createdUser = serializedDto(purchase.createdUser)
  if (purchase?.purchaseItem) purchase.purchaseItem = serializedDto(purchase?.purchaseItem)

  const purchaseConfig = await purchaseConfigService.getPurchaseConfig({ purchaseId })
  const rules = purchaseConfig?.priceRules ? serializedDto(purchaseConfig?.priceRules) : []

  return {
    props: { purchase: serializedDto(purchase || {}), rules: serializedDto(rules || {}) }
  }
}

export default Print

const Container = styled.div<{ expand?: boolean }>`
  /* padding: 20px; */
  display: flex;
  height: 100%;
  max-height: 100%;
  position: relative;
  flex-flow: row wrap;
  align-items: center;
  overflow: hidden;
  /* border: 1px dashed #000; */
  margin: auto;
  max-width: 219mm;
  width: 100%;
  background-color: #fff;

  /* & > div {
    flex: 1;
  } */
`
