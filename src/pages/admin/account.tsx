import { Container } from '@mui/material'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { UserForm } from '~/components/Users/UserForm'

const PageAdminAccount: NextPage = () => {
  const [session] = useSession()

  return (
    <LayoutAdmin>
      <Container>
        <PageTitle
          spotlight="Minhas"
          title="informações"
          description={'Use o formulário abaixo para modificar suas informações.'}
        />
        <FormContainer>
          <UserForm initialData={session?.user ?? {}} />
        </FormContainer>
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminAccount

const FormContainer = styled.div``
