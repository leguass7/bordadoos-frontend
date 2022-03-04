import React, { useCallback, useState } from 'react'
import { IoReload } from 'react-icons/io5'

import { useRouter } from 'next/router'

import { Add } from '@mui/icons-material'
import { ButtonGroup, IconButton, Button, Container } from '@mui/material'
import { Purchase } from '@prisma/client'

import { DrawerCustomer } from '../DrawerCustomer'
import { PageTitle } from '../PageTitle'
import { usePagination } from '../Providers/PaginationProvider'
import { SearchBar } from '../SearchBar'

export const PurchaseFilter: React.FC = () => {
  const { updateFilter, refreshData } = usePagination<Purchase>()
  const [openSearch, setOpenSearch] = useState(false)
  const { push } = useRouter()

  const handleSearchChange = useCallback(
    (search: string | number) => {
      const filter = search ? { search } : {}
      updateFilter(filter)
    },
    [updateFilter]
  )

  const handleSelectCustomer = useCallback(
    (clientId?: number) => {
      if (clientId) updateFilter({ clientId })
    },
    [updateFilter]
  )

  return (
    <>
      <Container>
        <PageTitle spotlight="Pedidos" title="cadastrados" description={'Lista de pedidos cadastrados'}>
          <IconButton size="large" color="primary" onClick={() => push('/admin')}>
            <Add />
          </IconButton>
          <IconButton size="large" color="primary" onClick={() => refreshData()}>
            <IoReload size={18} />
          </IconButton>
          {/* <IconButton size="large" color="primary" onClick={() => setFiltered(old => !old)}> */}
          {/* {filtered ? <FilterListOff /> : <FilterList />} */}
          {/* </IconButton> */}
        </PageTitle>
      </Container>
      <Container style={{ marginBottom: '4px' }}>
        <SearchBar onChangeText={handleSearchChange} />
        <ButtonGroup style={{ margin: '0 4px' }}>
          <Button variant="contained" color="primary" onClick={() => setOpenSearch(true)}>
            Procurar cliente
          </Button>
        </ButtonGroup>
      </Container>
      <DrawerCustomer open={openSearch} onClose={() => setOpenSearch(false)} onSelecCustomer={handleSelectCustomer} />
    </>
  )
}
