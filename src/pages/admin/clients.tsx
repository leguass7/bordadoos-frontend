import { useState } from 'react'

import type { NextPage } from 'next'

import { Add } from '@mui/icons-material'
import { Container, Toolbar, IconButton } from '@mui/material'

import { ClientList } from '~/components/Clients/ClientList'
import { ClientSearch } from '~/components/Clients/ClientSearch'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'

const PageAdminClients: NextPage = () => {
  const [modal, setModal] = useState({ show: false, id: 0 })

  const handleToggleModal = (id = 0) => setModal(old => ({ id, show: !old.show }))

  return (
    <LayoutAdmin>
      <PaginationProvider url="/clients">
        <Container>
          <PageTitle spotlight="Clientes" title="cadastrados" description={'Lista de clientes cadastrados no sistema.'}>
            <Toolbar>
              <IconButton onClick={() => handleToggleModal()}>
                <Add />
              </IconButton>
            </Toolbar>
          </PageTitle>
        </Container>
        <Container>
          <ClientSearch />
        </Container>
        <Container>
          <ClientList modal={modal} toggleModal={handleToggleModal} />
        </Container>
      </PaginationProvider>
    </LayoutAdmin>
  )
}

export default PageAdminClients
