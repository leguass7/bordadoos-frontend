import { GetServerSideProps, NextPage } from 'next'

import { Divider, Typography } from '@mui/material'
import styled from 'styled-components'

import { PurchasePrinter } from '~/components/Printer/PurchasePrinter'
import { PurchaseService } from '~/serverSide/purchases/purchase.service'
import { PurchaseWithItems } from '~/services/api/purchase'

import { serializedDto } from '../../../helpers/database'

interface Props {
  purchase?: PurchaseWithItems
}

const Print: NextPage<Props> = ({ purchase }) => {
  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Typography variant="h4" align="center">
          Pedido {purchase?.id}
        </Typography>
        <Divider />
      </div>

      <PurchasePrinter purchase={purchase} />
      <div style={{ flex: 1 }}></div>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const purchaseId = Number(params.purchaseId)

  const purchase = await PurchaseService.findById(purchaseId)

  purchase.category = serializedDto(purchase.category)
  purchase.type = serializedDto(purchase.type)
  purchase.client = serializedDto(purchase.client)

  return {
    props: { purchase: serializedDto(purchase) }
  }
}

export default Print

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-flow: column wrap;
  align-items: center;
  /* border: 1px dashed #000; */
  margin: auto;
  width: 219mm;
  background-color: #fff;
`
