import { Container } from '@mui/material'
import type { NextPage } from 'next'

// import { useSession } from 'next-auth/client'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PurchasePanel } from '~/components/purchase/PurchasePanel'

const PageAdminIndex: NextPage = () => {
  // const [session] = useSession()

  return (
    <LayoutAdmin>
      <Container>
        <PageTitle
          spotlight="Nova"
          title="ordem de serviço"
          description={'Preencha as informações para iniciar uma nova O.S.'}
        />
        <PurchasePanel />
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminIndex
