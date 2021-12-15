import { Container } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'
import { UserList } from '~/components/Users/UserList'
import { UserSearch } from '~/components/Users/UserSearch'

const Users: React.FC = () => {
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
          <UserSearch />
        </Container>
        <Container>
          <UserList />
        </Container>
      </PaginationProvider>
    </LayoutAdmin>
  )
}

export default Users
