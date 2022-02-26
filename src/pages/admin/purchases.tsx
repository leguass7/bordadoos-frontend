import { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import { Add, FilterList, FilterListOff } from '@mui/icons-material'
import { Container, IconButton } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'

const PageAdminPurchases: NextPage = () => {
  const [filtered, setFiltered] = useState(false)
  const { push, prefetch } = useRouter()

  useEffect(() => {
    prefetch('/admin')
  }, [prefetch])

  return (
    <LayoutAdmin>
      <Container>
        <PageTitle spotlight="Pedidos" title="cadastrados" description={'Lista de pedidos cadastrados'}>
          <IconButton size="large" color="primary" onClick={() => push('/admin')}>
            <Add />
          </IconButton>
          <IconButton size="large" color="primary" onClick={() => setFiltered(old => !old)}>
            {filtered ? <FilterListOff /> : <FilterList />}
          </IconButton>
        </PageTitle>
      </Container>
    </LayoutAdmin>
  )
}

export default PageAdminPurchases
