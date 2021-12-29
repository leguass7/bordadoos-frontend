import { Box, Button, Container, Typography } from '@mui/material'
import { User } from '@prisma/client'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { CircleLoading } from '~/components/CircleLoading'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { UserForm } from '~/components/Users/UserForm'
import { useIsMounted } from '~/hooks/useIsMounted'
import { api } from '~/services/api'

const PageAdminAccount: NextPage = () => {
  const [session] = useSession()

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const [disable, setDisable] = useState(true)
  const [user, setUser] = useState<Partial<User>>({})

  const userId = useMemo(() => parseInt(`${session?.user?.userId || 0}`), [session])

  const fetchData = useCallback(async () => {
    if (userId) {
      setLoading(true)
      const { data: response } = await api.get(`users/${userId}`)
      if (isMounted.current) {
        setLoading(false)
        if (response && response.success) setUser(response.user)
      }
    }
  }, [isMounted, userId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <LayoutAdmin>
      <Container>
        <Box p={4} justifyContent="center" alignItems="center" display="flex" flexDirection="column">
          <Typography variant="h5" color="grayText">
            Minhas informações:
          </Typography>
          <UserForm initialData={user} key={user?.id} disable={disable} onCancel={() => setDisable(old => !old)} />
          <Box p={4} justifyContent="center" alignItems="center" display="flex">
            {disable ? (
              <Button color="primary" variant="outlined" onClick={() => setDisable(old => !old)}>
                Editar dados
              </Button>
            ) : null}
          </Box>
        </Box>
      </Container>
      {loading ? <CircleLoading /> : null}
    </LayoutAdmin>
  )
}

export default PageAdminAccount
