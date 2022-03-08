import React, { useCallback, useState } from 'react'
import { IoReload } from 'react-icons/io5'

import { useRouter } from 'next/router'

import { Add } from '@mui/icons-material'
import { DatePicker } from '@mui/lab'
import { IconButton, Container } from '@mui/material'
import { Purchase } from '@prisma/client'
import { Form } from '@unform/web'

import { formatDate } from '~/helpers/string'

import { Datepicker } from '../Form/Datepicker'
import { PageTitle } from '../PageTitle'
import { usePagination } from '../Providers/PaginationProvider'
import { SearchBar } from '../SearchBar'

export const PurchaseFilter: React.FC = () => {
  const { updateFilter, refreshData } = usePagination<Purchase>()
  const { push } = useRouter()

  const handleSearchChange = useCallback(
    (field: string) => (search: string | number | Date) => {
      if (field && search) {
        if (search instanceof Date) search = formatDate(search, 'yyyy-MM-dd')
        const filter: any = {}
        filter[field] = search
        updateFilter(filter)
      }
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
          <IconButton size="large" color="primary" onClick={refreshData}>
            <IoReload size={18} />
          </IconButton>
          {/* <IconButton size="large" color="primary" onClick={() => setFiltered(old => !old)}> */}
          {/* {filtered ? <FilterListOff /> : <FilterList />} */}
          {/* </IconButton> */}
        </PageTitle>
      </Container>
      <Container style={{ marginBottom: '4px' }}>
        <SearchBar onChangeText={handleSearchChange('search')} />
        <Form onSubmit={null}>
          <div style={{ display: 'flex' }}>
            <Datepicker name="startDate" onChange={handleSearchChange('startDate')} />
            <Datepicker name="endDate" onChange={handleSearchChange('endDate')} />
          </div>
        </Form>
        {/* <ButtonGroup style={{ margin: '0 4px' }}>
          <Button variant="contained" color="primary" onClick={() => setOpenSearch(true)}>
            Procurar cliente
          </Button>
        </ButtonGroup> */}
      </Container>
      {/* <DrawerCustomer open={openSearch} onClose={() => setOpenSearch(false)} onSelecCustomer={handleSelectCustomer} /> */}
    </>
  )
}
