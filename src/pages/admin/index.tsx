import { useMemo } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Container } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PurchasePanel } from '~/components/purchase/PurchasePanel/index'
import { PurchasePanelProvider } from '~/components/purchase/PurchasePanel/PurchasePanelProvider'

const PageAdminIndex: NextPage = () => {
  const { query } = useRouter()

  const purchaseId = useMemo(() => (query?.purchaseId ? parseInt(`${query?.purchaseId}`) : 0), [query])

  return (
    <LayoutAdmin>
      <Container>
        <PageTitle
          spotlight="Nova"
          title="ordem de serviço"
          description={'Preencha as informações para iniciar uma nova O.S.'}
        />
        <PurchasePanelProvider purchaseId={purchaseId}>
          <PurchasePanel purchaseId={purchaseId} />
        </PurchasePanelProvider>
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminIndex
