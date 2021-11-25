import { Container } from '@mui/material'
import type { NextPage } from 'next'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'

const PageAdminClients: NextPage = () => {
  return (
    <LayoutAdmin>
      <Container>
        <PageTitle spotlight="Clientes" title="cadastrados" description={'Lista de clientes cadastrados no sistema.'} />
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminClients
