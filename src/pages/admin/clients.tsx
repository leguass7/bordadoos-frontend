import { Add } from '@mui/icons-material'
import { Modal, Container, Toolbar, IconButton } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'

import { ClientForm } from '~/components/Clients/ClientForm'
import { ClientList } from '~/components/Clients/ClientList'
import { ClientSearch } from '~/components/Clients/ClientSearch'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { ModalForm } from '~/components/ModalForm'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'

const PageAdminClients: NextPage = () => {
  const [openAddModal, setAddModal] = useState(false)
  const handleAddClose = () => setAddModal(false)
  const handleAddOpen = () => setAddModal(true)

  return (
    <LayoutAdmin>
      <PaginationProvider url="/clients" initialFilter={{}}>
        <Container>
          <PageTitle spotlight="Clientes" title="cadastrados" description={'Lista de clientes cadastrados no sistema.'}>
            <Toolbar>
              <IconButton onClick={handleAddOpen}>
                <Add />
              </IconButton>
            </Toolbar>
          </PageTitle>
        </Container>
        <Container>
          <ClientSearch />
        </Container>
        <Container>
          <ClientList />
        </Container>
      </PaginationProvider>
      <Modal open={openAddModal} onClose={handleAddClose}>
        <div>
          <ModalForm title={'Incluir cliente'}>
            <ClientForm onCancel={handleAddClose} />
          </ModalForm>
        </div>
      </Modal>
    </LayoutAdmin>
  )
}

export default PageAdminClients
