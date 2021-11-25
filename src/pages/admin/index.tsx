import { Container } from '@mui/material'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'

const PageAdminIndex: NextPage = () => {
  const [session] = useSession()

  return (
    <LayoutAdmin>
      <Container>
        <PageTitle spotlight="Novo" title="pedido" description={'Clique na categoria para alterá-la'}>
          {/* <IconButton size="large" color="primary" onClick={() => setFormOpen(true)}>
            <Add />
          </IconButton> */}
        </PageTitle>
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminIndex
