import { Container } from '@mui/material'
import type { NextPage } from 'next'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'

const PageAdminPosition: NextPage = () => {
  return (
    <LayoutAdmin>
      <Container>
        <PageTitle
          spotlight="Posições"
          title="dos bordados"
          description={'Posições onde ficarão os tipos de bordados'}
        />
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminPosition
