import { useCallback, useState } from 'react'

import { Container, Modal } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { ModalForm } from '~/components/ModalForm'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'
import { UserFilter } from '~/components/Users/UserFilter'
import { UserForm } from '~/components/Users/UserForm'
import { UserList } from '~/components/Users/UserList'

const Users: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)

  const toggleModal = useCallback(() => {
    setOpenModal(old => !old)
  }, [])

  return (
    <LayoutAdmin>
      <PaginationProvider url="/users">
        <Container>
          <PageTitle
            spotlight="Usuários"
            title="cadastrados"
            description={'Lista de usuários cadastrados no sistema.'}
          />
        </Container>
        <Container>
          <UserFilter onAdd={toggleModal} />
        </Container>
        <Container>
          <UserList />
        </Container>
        <Modal open={!!openModal} onClose={toggleModal}>
          <div>
            <ModalForm title={'Cadastrar usuário'}>
              <UserForm onSuccess={toggleModal} onCancel={toggleModal} />
            </ModalForm>
          </div>
        </Modal>
      </PaginationProvider>
    </LayoutAdmin>
  )
}

export default Users
