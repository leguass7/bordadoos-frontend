import { Container } from '@mui/material'
import type { NextPage } from 'next'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'

const PageAdminServices: NextPage = () => {
  return (
    <LayoutAdmin>
      <Container>
        <PageTitle
          spotlight="Tipos"
          title="de bordados"
          description={'Tipos de bordados usado para incluir novo pedido.'}
        />
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminServices
