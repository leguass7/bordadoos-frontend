import { useMemo } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Container } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PurchasePanel } from '~/components/purchase/PurchasePanel/index'
import { PurchaseProvider } from '~/components/purchase/PurchaseProvider'

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
        <PurchaseProvider>
          <PurchasePanel purchaseId={purchaseId} />
        </PurchaseProvider>
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminIndex
