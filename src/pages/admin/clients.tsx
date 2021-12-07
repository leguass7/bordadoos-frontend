import { Add } from '@mui/icons-material'
import { Button, Modal, Container, Toolbar, IconButton } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useCallback, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

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
      <PaginationProvider url="/clients" initialFilter={{ actived: true }}>
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

const show = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
  `

const ModalContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: #d5d5d5;
  box-shadow: 1px 1px 0 1px #0003;
  padding: ${({ theme }) => theme.spacing.xl}px;
  border-radius: ${({ theme }) => theme.rounded}px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${show} 0.4s ease forwards;
  border: 1px dashed #f00;
`
