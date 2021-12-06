import { Add } from '@mui/icons-material'
import { Button, Modal, Container } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useCallback, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

import { ClientForm } from '~/components/Clients/ClientForm'
import { ClientList } from '~/components/Clients/ClientList'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'

const initialModals = [{ id: 1, label: 'Adicionar', Icon: <Add />, color: 'primary', show: false }]

const PageAdminClients: NextPage = () => {
  const [modals, setModals] = useState(initialModals)
  const { query, pathname, replace } = useRouter()

  const clientId = useMemo(() => parseInt(`${query?.clientId ?? 0}`), [query])

  const handleChange = useCallback(
    (modalId: number) => () => {
      if (clientId) replace(pathname, undefined, { shallow: true })
      setModals(old => old.map(item => (item.id === modalId ? { ...item, show: !item.show } : item)))
    },
    [replace, pathname, clientId]
  )

  return (
    <LayoutAdmin>
      <PaginationProvider url="/clients" initialFilter={{ actived: true }}>
        <Container>
          <PageTitle
            spotlight="Clientes"
            title="cadastrados"
            description={'Lista de clientes cadastrados no sistema.'}
          />
        </Container>
        <MenuContainer>
          <Container>
            <Content>
              {modals.map(({ Icon, color, id, label }) => {
                return (
                  <Button key={`modal-${id}`} onClick={handleChange(id)} color={color as any}>
                    {label}
                    {Icon}
                  </Button>
                )
              })}
              <Modal open={!!modals[0].show} onClose={handleChange(1)}>
                <ModalContainer>
                  <ClientForm onClose={handleChange(1)} />
                </ModalContainer>
              </Modal>
            </Content>
          </Container>
        </MenuContainer>
        <Container>
          <ClientList modalChange={handleChange(1)} />
        </Container>
      </PaginationProvider>
    </LayoutAdmin>
  )
}

export default PageAdminClients

const MenuContainer = styled.div`
  padding: 4px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${props => props.theme.colors.background};
`

const Content = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

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
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${show} 0.4s ease forwards;
`
