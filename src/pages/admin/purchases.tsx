import type { NextPage } from 'next'

import { Container } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'
import { PurchaseFilter } from '~/components/purchase/PurchaseFilter'
import { PurchaseList } from '~/components/purchase/PurchaseList'
import { PurchaseProvider } from '~/components/purchase/PurchaseProvider'

const PageAdminPurchases: NextPage = () => {
  return (
    <PaginationProvider url="/purchases">
      <PurchaseProvider>
        <LayoutAdmin>
          <PurchaseFilter />
          <Container>
            <PurchaseList />
          </Container>
        </LayoutAdmin>
      </PurchaseProvider>
    </PaginationProvider>
  )
}

export default PageAdminPurchases
