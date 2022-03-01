import { useMemo, useState } from 'react'

import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'

import { Box, Button, Container, Typography } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { UserForm } from '~/components/Users/UserForm'

const PageAdminAccount: NextPage = () => {
  const [session] = useSession()

  const [disable, setDisable] = useState(true)

  const userId = useMemo(() => parseInt(`${session?.user?.userId || 0}`), [session])

  return (
    <LayoutAdmin>
      <Container>
        <Box p={4} justifyContent="center" alignItems="center" display="flex" flexDirection="column">
          <Typography variant="h5" color="grayText">
            Minhas informações:
          </Typography>
          <UserForm userId={userId} disable={disable} onCancel={() => setDisable(old => !old)} />
          <Box p={4} justifyContent="center" alignItems="center" display="flex">
            {disable ? (
              <Button color="primary" variant="outlined" onClick={() => setDisable(old => !old)}>
                Editar dados
              </Button>
            ) : null}
          </Box>
        </Box>
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminAccount
