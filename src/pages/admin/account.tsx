import { Container } from '@mui/material'
import type { NextPage } from 'next'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'

const PageAdminAccount: NextPage = () => {
  return (
    <LayoutAdmin>
      <Container>
        <PageTitle
          spotlight="Minhas"
          title="informações"
          description={'Use o formulário abaixo para modificar suas informações.'}
        />
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminAccount
